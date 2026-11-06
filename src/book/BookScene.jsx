import React, { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { Page } from "./Pages";
import { LanguageContext, useLang } from "../i18n/LanguageContext";
import { SPREADS } from "./spreads";

// Medidas del modelo exportado desde Blender (blender/book.blend), en unidades de three.js.
const COVER_W = 1.45; // ancho de la tapa
const PAGE_X0 = 0.02; // las páginas empiezan a 2 cm del lomo
const PAGE_W = 1.38;
const PAGE_D = 2.0; // alto de la página (eje Z en three.js)
const READ_Y = 0.17; // altura de la superficie de lectura con el libro abierto
const PAGE_CX = PAGE_X0 + PAGE_W / 2;

const MODEL_URL = "/models/book.glb";
const FLIP_SECONDS = 0.9;

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Book({ open, onToggle, onSettled }) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef();
  const progress = useRef(0);
  const settled = useRef(false);

  const parts = useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const spine = scene.getObjectByName("Spine");
    return { hinge: scene.getObjectByName("Hinge_Front"), spine, spineY: spine.position.y };
  }, [scene]);

  useFrame((_, dt) => {
    const target = open ? 1 : 0;
    progress.current = prefersReducedMotion
      ? target
      : THREE.MathUtils.damp(progress.current, target, 3.2, Math.min(dt, 0.1));
    const p = progress.current;
    // La portada gira 180° sobre la bisagra; el lomo gira la mitad y queda bajo el libro.
    parts.hinge.rotation.z = Math.PI * p;
    parts.spine.rotation.z = (Math.PI / 2) * p;
    // Abierto, el lomo queda bajo las páginas y sus paredes se colaban entre ellas como
    // rayas: se hunde un poco y, con el libro del todo abierto (donde no se ve), se oculta.
    parts.spine.position.y = parts.spineY - 0.02 * p;
    parts.spine.visible = p < 0.97;
    // Cerrado, el libro se centra en pantalla; abierto, el lomo queda en el centro.
    group.current.position.x = -(COVER_W / 2) * (1 - p);

    // Avisa cuando la portada termina de abrirse (o empieza a cerrarse) para mostrar u ocultar el texto.
    const isSettled = open && p > 0.97;
    if (isSettled !== settled.current) {
      settled.current = isSettled;
      onSettled(isSettled);
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        onClick={(e) => {
          if (!open) {
            e.stopPropagation();
            onToggle();
          }
        }}
        onPointerOver={() => {
          if (!open) document.body.style.cursor = "var(--cursor-pointer)";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      />
    </group>
  );
}

// Hoja que se dibuja solo mientras se pasa página. Se curva: el borde exterior
// se retrasa respecto al lomo, como una hoja de papel real.
// - Con botones o teclado (flip.manual = false) gira sola en FLIP_SECONDS.
// - Al arrastrarla (flip.manual = true) sigue al ratón (drag.current.p, 0..1) y,
//   al soltar, termina de pasar (onDone) o vuelve a su sitio (onCancel).
function FlippingSheet({ flip, drag, onDone, onCancel }) {
  const tex = useTexture("/textures/parchment.jpg");
  const mesh = useRef();
  const start = useRef(null);
  const progress = useRef(0); // avance del giro en su dirección, 0..1
  const finished = useRef(false);
  const COLS = 32;

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, COLS, 1), []);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);

  useEffect(() => {
    start.current = null;
    progress.current = 0;
    finished.current = false;
  }, [flip]);

  useFrame((state, dt) => {
    if (!flip || !mesh.current || finished.current) return;
    let cur;
    let end = null; // "done" | "cancel"

    if (flip.manual) {
      const d = drag.current;
      const step = Math.min(dt, 0.1);
      if (d.active) {
        cur = THREE.MathUtils.damp(progress.current, d.p, 14, step);
      } else {
        const target = d.release === "complete" ? 1 : 0;
        cur = prefersReducedMotion ? target : THREE.MathUtils.damp(progress.current, target, 7, step);
        if (Math.abs(cur - target) < 0.004) {
          cur = target;
          end = target === 1 ? "done" : "cancel";
        }
      }
    } else {
      if (start.current === null) start.current = state.clock.elapsedTime;
      const duration = prefersReducedMotion ? 0.01 : FLIP_SECONDS;
      const t = Math.min((state.clock.elapsedTime - start.current) / duration, 1);
      cur = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      if (t >= 1) end = "done";
    }
    progress.current = cur;

    // p: 0 = hoja apoyada a la derecha, 1 = apoyada a la izquierda.
    // dir 1: de derecha a izquierda (siguiente); dir -1: al revés (anterior)
    const p = flip.dir === 1 ? cur : 1 - cur;
    const lag = 0.55 * Math.sin(Math.PI * p) * flip.dir;

    const pos = geometry.attributes.position;
    let x = PAGE_X0 * Math.cos(Math.PI * p);
    let y = PAGE_X0 * Math.sin(Math.PI * p);
    const seg = PAGE_W / COLS;
    for (let i = 0; i <= COLS; i++) {
      // PlaneGeometry: fila superior índices 0..COLS, inferior COLS+1..2*COLS+1
      pos.setXYZ(i, x, READ_Y + 0.004 + y, -PAGE_D / 2);
      pos.setXYZ(i + COLS + 1, x, READ_Y + 0.004 + y, PAGE_D / 2);
      const a = Math.PI * p - lag * ((i + 0.5) / COLS);
      x += seg * Math.cos(a);
      y += seg * Math.sin(a);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    if (end) {
      finished.current = true;
      end === "done" ? onDone() : onCancel();
    }
  });

  if (!flip) return null;
  return (
    <mesh ref={mesh} geometry={geometry} castShadow frustumCulled={false}>
      <meshStandardMaterial map={tex} side={THREE.DoubleSide} roughness={0.9} />
    </mesh>
  );
}

// Contenido HTML colocado sobre la superficie de cada página.
function PageOverlay({ side, spreadIndex, visible, narrow, onJump, onGrab }) {
  const spread = SPREADS[spreadIndex];
  const page = side === "left" ? spread.left : spread.right;
  const number = spreadIndex * 2 + (side === "left" ? 1 : 2);
  // Html se dibuja en otra raíz de React: hay que volver a proveer el contexto del idioma.
  const lang = useLang();
  return (
    <Html
      transform
      distanceFactor={1}
      position={[side === "left" ? -PAGE_CX : PAGE_CX, READ_Y + 0.002, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      zIndexRange={[10, 0]}
      className={`page-overlay ${visible ? "is-visible" : ""} ${narrow ? "is-narrow" : ""}`}
    >
      <LanguageContext.Provider value={lang}>
        <div aria-hidden={!visible}>
          <Page page={page} chapter={spread.chapter} number={number} side={side} onJump={onJump} onGrab={narrow ? null : onGrab} />
        </div>
      </LanguageContext.Provider>
    </Html>
  );
}

// Escala mínima del texto (1 = tamaño de diseño). Por debajo, la cámara se
// acerca para leer y la página se recorre en vertical (rueda o flechas ↑ ↓).
const MIN_TEXT_SCALE = 0.85;
const UI_TOP_PX = 64; // barra superior
const UI_BOTTOM_PX = () => (window.innerHeight < 720 ? 112 : 150); // placa de navegación

// Encuadra la cámara según el estado: libro cerrado, abierto entero o, en
// pantallas estrechas, una sola página.
function CameraRig({ open, narrow, side, spreadIndex, scrollRef }) {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3(0, READ_Y, 0));
  const pan = useRef(-Infinity); // desplazamiento vertical en modo lectura (se recorta a su rango)
  const view = useRef({ excess: 0, ppu: 1 });

  // Cada página nueva empieza arriba.
  useEffect(() => {
    pan.current = -Infinity;
  }, [spreadIndex, side, open]);

  // Rueda del ratón y flechas ↑ ↓ desplazan la página cuando no cabe entera.
  useEffect(() => {
    const scroll = (deltaPx) => {
      const { excess, ppu } = view.current;
      if (excess <= 0) return false;
      const base = Number.isFinite(pan.current) ? pan.current : -excess / 2;
      pan.current = THREE.MathUtils.clamp(base + deltaPx / ppu, -excess / 2, excess / 2);
      return true;
    };
    const onWheel = (e) => scroll(e.deltaY);
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (scroll((e.key === "ArrowDown" ? 1 : -1) * 120)) e.preventDefault();
      }
    };
    let touchY = null;
    const onTouchStart = (e) => (touchY = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY === null) return;
      const y = e.touches[0].clientY;
      scroll(touchY - y);
      touchY = y;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useFrame((_, dt) => {
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const tanV = Math.tan(vfov / 2);
    const H = size.height;
    const W = size.width;

    let target, dist, dir;
    let excess = 0;
    let ppu = 1;
    if (!open) {
      const aspect = W / H;
      const hfov = 2 * Math.atan(tanV * aspect);
      target = new THREE.Vector3(0, 0.1, 0.1);
      // En vertical el libro inclinado ocupa más ancho del que parece: se deja más margen.
      const w = narrow ? 2.6 : 1.9;
      const h = 2.5;
      dir = new THREE.Vector3(0.35, 1, 1.05);
      dist = Math.max(w / 2 / Math.tan(hfov / 2), h / 2 / tanV) * 1.06;
    } else {
      const w = narrow ? PAGE_W + 0.08 : COVER_W * 2 + 0.15;
      const h = PAGE_D + 0.12;
      const cx = narrow ? (side === "left" ? -PAGE_CX : PAGE_CX) : 0;
      dir = new THREE.Vector3(0, 1, narrow ? 0.12 : 0.2);

      // Distancia para que quepa a lo ancho y en el hueco libre entre la barra y la placa.
      const availH = Math.max(H - UI_TOP_PX - UI_BOTTOM_PX(), 160);
      const dW = (H * w) / (2 * tanV * W);
      const dH = (H * h) / (2 * tanV * availH);
      dist = Math.max(dW, dH);
      ppu = H / (2 * dist * tanV); // píxeles de pantalla por unidad 3D

      // Si así el texto queda pequeño, se acerca (sin pasarse del ancho) y se habilita el desplazamiento.
      const minPpu = 400 * MIN_TEXT_SCALE;
      if (ppu < minPpu) {
        dist = Math.max(dW, H / (2 * tanV * minPpu));
        ppu = H / (2 * dist * tanV);
      }
      excess = Math.max(0, h - availH / ppu);
      if (excess > 0 && !Number.isFinite(pan.current)) pan.current = -excess / 2;
      const p = excess > 0 ? THREE.MathUtils.clamp(pan.current, -excess / 2, excess / 2) : 0;

      // Centra la página en el hueco libre (la placa de abajo es más alta que la barra de arriba).
      const shift = (UI_BOTTOM_PX() - UI_TOP_PX) / 2 / ppu;
      target = new THREE.Vector3(cx, READ_Y, shift + p);

      // Indicador de desplazamiento (DOM), sin re-renderizar React.
      const bar = scrollRef && scrollRef.current;
      if (bar) {
        bar.style.opacity = excess > 0 ? "1" : "0";
        const visible = (h - excess) / h;
        bar.style.setProperty("--thumb-size", `${visible * 100}%`);
        bar.style.setProperty("--thumb-pos", `${excess > 0 ? ((p + excess / 2) / excess) * (1 - visible) * 100 : 0}%`);
      }
    }
    view.current = { excess, ppu };

    const desired = target.clone().add(dir.normalize().multiplyScalar(dist));
    const k = prefersReducedMotion ? 1 : 1 - Math.exp(-4 * Math.min(dt, 0.1));
    camera.position.lerp(desired, k);
    look.current.lerp(target, k);
    camera.lookAt(look.current);
  });
  return null;
}

function Candlelight() {
  const light = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    light.current.intensity = 6 + Math.sin(t * 7.3) * 0.5 + Math.sin(t * 13.1) * 0.35;
  });
  return <pointLight ref={light} position={[-2.4, 1.6, -1.4]} color="#ffb060" distance={9} decay={1.6} />;
}

export default function BookScene({ open, spreadIndex, flip, drag, contentVisible, narrow, side, scrollRef, onToggle, onSettled, onFlipDone, onFlipCancel, onJump, onGrab }) {
  return (
    <Canvas
      className="book-canvas"
      dpr={[1, 2]}
      shadows
      camera={{ fov: 32, near: 0.1, far: 50, position: [1.5, 4.5, 4.5] }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} color="#ffe2c0" />
      <directionalLight
        position={[1.5, 5, 2.5]}
        intensity={1.6}
        color="#fff1dc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <Candlelight />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={1.6} color="#ffe6c4" position={[0, 5, 2]} scale={[8, 4, 1]} rotation-x={-Math.PI / 2.5} />
          <Lightformer form="ring" intensity={3} color="#ffb060" position={[-3, 2, -2]} scale={1.5} />
          <Lightformer form="rect" intensity={0.6} color="#8a6cff" position={[3, 1, -3]} scale={[4, 2, 1]} />
        </Environment>
        <Book open={open} onToggle={onToggle} onSettled={onSettled} />
        <FlippingSheet flip={flip} drag={drag} onDone={onFlipDone} onCancel={onFlipCancel} />
        {open && (
          <>
            <PageOverlay side="left" spreadIndex={spreadIndex} visible={contentVisible} narrow={narrow} onJump={onJump} onGrab={onGrab} />
            <PageOverlay side="right" spreadIndex={spreadIndex} visible={contentVisible} narrow={narrow} onJump={onJump} onGrab={onGrab} />
          </>
        )}
        <ContactShadows position={[0, -0.002, 0]} scale={7} blur={2.4} opacity={0.65} far={1.2} color="#120804" />
        <Sparkles count={70} scale={[6, 2.5, 4]} position={[0, 1.2, 0]} size={2.2} speed={0.25} color="#f6c96b" opacity={0.7} />
      </Suspense>
      <CameraRig open={open} narrow={narrow} side={side} spreadIndex={spreadIndex} scrollRef={scrollRef} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
