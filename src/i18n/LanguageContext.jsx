import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ui } from "./ui";

export const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch (e) {}
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }, [lang]);

  const value = useMemo(() => {
    // tr: traduce un valor de los datos ({ es, en } o texto plano)
    const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.es : v);
    // t: texto de la interfaz por clave
    const t = (key) => ui[lang][key] ?? key;
    return { lang, setLang, tr, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

const MONTHS = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

// "2024-06" -> "jun 2024" / "Jun 2024"; null -> "Actualidad"/"Present"
export function formatPeriod(start, end, lang) {
  const f = (s) => {
    const [y, m] = s.split("-");
    return `${MONTHS[lang][Number(m) - 1]} ${y}`;
  };
  return `${f(start)} — ${end ? f(end) : ui[lang].present}`;
}
