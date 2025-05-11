import { writable } from "svelte/store";

export type LanguageKey = "es" | "en";

export const sidebarOpen = writable(false);
export const selectedFilter = writable("all");
export const selectedLanguage = writable<LanguageKey>("es");

export const translations = {
  es: {
    all: "Todos",
    offerings: "Ofrendas",
    routes: "Rutas",
    information: "Información",
    parking: "Estacionamiento",
    hotel: "Hotel",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
  },
  en: {
    all: "All",
    offerings: "Offerings",
    routes: "Routes",
    information: "Information",
    parking: "Parking",
    hotel: "Hotel",
    language: "Language",
    spanish: "Spanish",
    english: "English",
  },
};
