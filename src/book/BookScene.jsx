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
          if (!open) document.body.style.cursor = "pointer";
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
function FlippingSheet({ flip, onDone }) {
  const tex = useTexture("/textures/parchment.jpg");
  const mesh = useRef();
  const start = useRef(null);
  const COLS = 32;

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1, COLS, 1);
    return g;
  }, []);

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);

  useEffect(() => {
    start.current = null;
  }, [flip]);

  useFrame((state) => {
    if (!flip || !mesh.current) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    const duration = prefersReducedMotion ? 0.01 : FLIP_SECONDS;
    let t = Math.min((state.clock.elapsedTime - start.current) / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    // dir 1: de derecha a izquierda (siguiente); dir -1: al revés (anterior)
    const p = flip.dir === 1 ? eased : 1 - eased;
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

    if (t >= 1) {
      start.current = null;
      onDone();
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
function PageOverlay({ side, spreadIndex, visible, narrow, onJump }) {
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
          <Page page={page} chapter={spread.chapter} number={number} side={side} onJump={onJump} />
        </div>
      </LanguageContext.Provider>
    </Html>
  );
}

// Encuadra la cámara según el estado: libro cerrado, abierto entero o, en
// pantallas estrechas, una sola página.
function CameraRig({ open, narrow, side }) {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3(0, READ_Y, 0));

  useFrame((_, dt) => {
    const aspect = size.width / size.height;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);

    let target, w, h, dir;
    if (!open) {
      target = new THREE.Vector3(0, 0.1, 0.1);
      // En vertical el libro inclinado ocupa más ancho del que parece: se deja más margen.
      w = narrow ? 2.6 : 1.9;
      h = 2.5;
      dir = new THREE.Vector3(0.35, 1, 1.05);
    } else if (narrow) {
      target = new THREE.Vector3(side === "left" ? -PAGE_CX : PAGE_CX, READ_Y, 0);
      w = PAGE_W + 0.08;
      h = PAGE_D + 0.1;
      dir = new THREE.Vector3(0, 1, 0.12);
    } else {
      target = new THREE.Vector3(0, READ_Y, 0.04);
      w = COVER_W * 2 + 0.15;
      h = PAGE_D + 0.25;
      dir = new THREE.Vector3(0, 1, 0.2);
    }
    const dist = Math.max(w / 2 / Math.tan(hfov / 2), h / 2 / Math.tan(vfov / 2)) * 1.06;
    const desired = target.clone().add(dir.normalize().multiplyScalar(dist));

    const k = prefersReducedMotion ? 1 : 1 - Math.exp(-3 * Math.min(dt, 0.1));
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

export default function BookScene({ open, spreadIndex, flip, contentVisible, narrow, side, onToggle, onSettled, onFlipDone, onJump }) {
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
        <FlippingSheet flip={flip} onDone={onFlipDone} />
        {open && (
          <>
            <PageOverlay side="left" spreadIndex={spreadIndex} visible={contentVisible} narrow={narrow} onJump={onJump} />
            <PageOverlay side="right" spreadIndex={spreadIndex} visible={contentVisible} narrow={narrow} onJump={onJump} />
          </>
        )}
        <ContactShadows position={[0, -0.002, 0]} scale={7} blur={2.4} opacity={0.65} far={1.2} color="#120804" />
        <Sparkles count={70} scale={[6, 2.5, 4]} position={[0, 1.2, 0]} size={2.2} speed={0.25} color="#f6c96b" opacity={0.7} />
      </Suspense>
      <CameraRig open={open} narrow={narrow} side={side} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
