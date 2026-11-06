import React from "react";
import { useLang, formatPeriod } from "../i18n/LanguageContext";
import { profile } from "../data/profile";
import { education } from "../data/experiences";
import { skillGroups } from "../data/skills";
import { CHAPTERS, firstSpreadOf } from "./spreads";
import F from "./FireText";

// Tamaño de una página en píxeles CSS. Mantiene la proporción de las páginas
// del modelo 3D (1.38 x 2.0 unidades).
export const PAGE_W = 552;
export const PAGE_H = 800;

function Flourish() {
  return (
    <svg className="flourish" viewBox="0 0 240 16" aria-hidden="true">
      <path d="M4 8 H96 M144 8 H236" />
      <path d="M120 2 L126 8 L120 14 L114 8 Z" />
      <circle cx="104" cy="8" r="2" />
      <circle cx="136" cy="8" r="2" />
    </svg>
  );
}

function ChapterHeading({ chapterId }) {
  const { t } = useLang();
  const ch = CHAPTERS.find((c) => c.id === chapterId);
  return (
    <header className="chapter-heading">
      <p className="chapter-kicker">
        <F text={`${t("chapter")} ${ch.numeral}`} />
      </p>
      <h2>
        <F text={t(chapterId)} />
      </h2>
      <Flourish />
    </header>
  );
}

function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((it) => (
        <li key={it}>
          <F text={it} />
        </li>
      ))}
    </ul>
  );
}

function TitlePage() {
  const { t, tr } = useLang();
  return (
    <div className="page-center">
      <p className="kicker">
        <F text={t("exLibris")} />
      </p>
      <img className="portrait" src={profile.photo} alt={profile.name} />
      <h1 className="title">
        <F text={profile.name} />
      </h1>
      <Flourish />
      <p className="subtitle">
        <F text={tr(profile.role)} />
      </p>
      <p className="muted italic">
        <F text={t("bookSubtitle")} />
      </p>
    </div>
  );
}

function TocPage({ onJump }) {
  const { t } = useLang();
  return (
    <div>
      <h2 className="toc-title">
        <F text={t("contents")} />
      </h2>
      <Flourish />
      <p className="italic muted">
        <F text={t("tocIntro")} />
      </p>
      <ol className="toc">
        {CHAPTERS.map((c) => {
          const spread = firstSpreadOf(c.id);
          return (
            <li key={c.id}>
              <button type="button" onClick={() => onJump(spread)}>
                <span className="toc-num">
                  <F text={c.numeral} />
                </span>
                <span className="toc-name">
                  <F text={t(c.id)} />
                </span>
                <span className="toc-dots" aria-hidden="true" />
                <span className="toc-page">
                  <F text={spread * 2 + 1} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AboutPage() {
  const { tr } = useLang();
  return (
    <div>
      <ChapterHeading chapterId="about" />
      {tr(profile.about).map((p, i) => (
        <p key={i}>
          <F text={p} dropcap={i === 0} />
        </p>
      ))}
    </div>
  );
}

function AboutCardPage() {
  const { t, tr, lang } = useLang();
  return (
    <div>
      <h3 className="section-title">
        <F text={t("education")} />
      </h3>
      {education.map((ed) => (
        <div key={ed.id} className="entry">
          <p className="entry-title">
            <F text={tr(ed.title)} />
          </p>
          <p>
            <F text={ed.institution} />
          </p>
          <p className="muted small">
            <F text={formatPeriod(ed.start, ed.end, lang)} />
          </p>
        </div>
      ))}
      <dl className="facts">
        <dt>
          <F text={t("location")} />
        </dt>
        <dd>
          <F text={profile.location} />
        </dd>
        <dt>
          <F text={t("languages")} />
        </dt>
        <dd>
          <F text={tr(profile.languages)} />
        </dd>
      </dl>
      <div className="page-center">
        <a className="seal-button" href={profile.cv} target="_blank" rel="noopener noreferrer">
          <F text={t("downloadCv")} />
        </a>
      </div>
    </div>
  );
}

function ExperienceMain({ data, first }) {
  const { tr, lang } = useLang();
  return (
    <div>
      {first && <ChapterHeading chapterId="experience" />}
      <p className="muted small caps">
        <F text={formatPeriod(data.start, data.end, lang)} />
      </p>
      <h3 className="entry-heading">
        <F text={tr(data.role)} />
      </h3>
      <p className="company">
        <F text={data.company} />
      </p>
      <p className="muted small">
        <F text={data.location} />
      </p>
      {!first && <Flourish />}
      <p>
        <F text={tr(data.summary)} dropcap />
      </p>
    </div>
  );
}

function ExperienceDetail({ data }) {
  const { t, tr } = useLang();
  return (
    <div>
      <h3 className="section-title">
        <F text={t("highlights")} />
      </h3>
      <ul className="quill-list">
        {tr(data.highlights).map((h, i) => (
          <li key={i}>
            <F text={h} />
          </li>
        ))}
      </ul>
      <h3 className="section-title">
        <F text={t("tools")} />
      </h3>
      <Tags items={data.tech} />
    </div>
  );
}

function ProjectImage({ data, first }) {
  const { t, tr } = useLang();
  return (
    <div>
      {first && <ChapterHeading chapterId="projects" />}
      <figure className="plate">
        {data.image ? (
          <img src={data.image} alt={tr(data.title)} />
        ) : (
          <div className="plate-empty">
            <F text={t("comingSoon")} />
          </div>
        )}
        <figcaption>
          <F text={tr(data.title)} />
        </figcaption>
      </figure>
    </div>
  );
}

function ProjectInfo({ data }) {
  const { t, tr } = useLang();
  return (
    <div>
      <h3 className="entry-heading">
        <F text={tr(data.title)} />
      </h3>
      <Flourish />
      <p>
        <F text={tr(data.description)} dropcap />
      </p>
      <h3 className="section-title">
        <F text={t("tools")} />
      </h3>
      <Tags items={data.tech} />
      {data.links.length > 0 && (
        <p className="links">
          {data.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              <F text={`${l.label} ↗`} />
            </a>
          ))}
        </p>
      )}
    </div>
  );
}

function SkillsPage() {
  const { tr } = useLang();
  return (
    <div>
      <ChapterHeading chapterId="skills" />
      {skillGroups.map((g) => (
        <div key={g.id} className="skill-group">
          <p className="skill-title">
            <F text={tr(g.title)} />
          </p>
          <p className="skill-items">
            <F text={g.items.join(" · ")} />
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactPage() {
  const { t } = useLang();
  return (
    <div>
      <h3 className="section-title">
        <F text={t("contact")} />
      </h3>
      <p className="italic">
        <F text={t("contactIntro")} />
      </p>
      <ul className="contacts">
        {profile.contacts.map((c) => (
          <li key={c.id}>
            <span className="contact-label">
              <F text={c.label} />
            </span>
            <a href={c.href} target="_blank" rel="noopener noreferrer">
              <F text={c.text} />
            </a>
          </li>
        ))}
      </ul>
      <div className="page-center farewell">
        <Flourish />
        <p className="italic muted">
          <F text={t("farewell")} />
        </p>
        <p className="monogram">
          <F text={profile.initials} />
        </p>
      </div>
    </div>
  );
}

const KINDS = {
  title: TitlePage,
  toc: TocPage,
  about: AboutPage,
  aboutCard: AboutCardPage,
  experienceMain: ExperienceMain,
  experienceDetail: ExperienceDetail,
  projectImage: ProjectImage,
  projectInfo: ProjectInfo,
  skills: SkillsPage,
  contact: ContactPage,
};

// Una página completa: contenido + cabecera de capítulo + número de página.
export function Page({ page, chapter, number, side, onJump }) {
  const { t } = useLang();
  const Content = KINDS[page.kind];
  return (
    <article className={`book-page book-page--${side}`} style={{ width: PAGE_W, height: PAGE_H }}>
      {chapter !== "contents" && (
        <p className="running-head">
          <F text={t(chapter)} />
        </p>
      )}
      <div className="page-body">
        <Content data={page.data} first={page.first} onJump={onJump} />
      </div>
      <p className="folio">
        <F text={number} />
      </p>
    </article>
  );
}
