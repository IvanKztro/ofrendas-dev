import { writable } from "svelte/store";
import type { LanguageKey } from "./generals";

export interface Location {
  id: number | string;
  name: {
    es: string;
    en: string;
    de: string;
    fr: string;
    it: string;
    zh: string;
    ja: string;
    ru: string;
  };
  type: "ofrenda" | "information" | "parking" | "hotel" | "route";
  lat: number;
  lng: number;
  description?: {
    es: string;
    en: string;
    de: string;
    fr: string;
    it: string;
    zh: string;
    ja: string;
    ru: string;
  };
  // Para rutas
  routePoints?: [number, number][];
  routeColor?: string;
  // Para puntos de interés en la ruta
  points?: {
    name: {
      es: string;
      en: string;
      de: string;
      fr: string;
      it: string;
      zh: string;
      ja: string;
      ru: string;
    };
    description: {
      es: string;
      en: string;
      de: string;
      fr: string;
      it: string;
      zh: string;
      ja: string;
      ru: string;
    };
    lat: number;
    lng: number;
    image?: string;
  }[];
  image?: string;
}

export const locations = writable<Location[]>([
  //   {
  //     id: 1,
  //     name: "Roman Mendoza Arizpe",
  //     lng: 0,
  //     lat: 0,
  //     type: "ofrenda",
  //   },
  {
    id: 2,
    name: {
      es: "Claudia Vega Gutierrez",
      en: "Claudia Vega Gutierrez",
      de: "Claudia Vega Gutierrez",
      fr: "Claudia Vega Gutierrez",
      it: "Claudia Vega Gutierrez",
      zh: "Claudia Vega Gutierrez",
      ja: "Claudia Vega Gutierrez",
      ru: "Claudia Vega Gutierrez",
    },
    lat: 18.7653794,
    lng: -98.5419528,
    type: "ofrenda",
  },
  {
    id: 3,
    name: {
      es: "Shesley Ramirez Garfias",
      en: "Shesley Ramirez Garfias",
      de: "Shesley Ramirez Garfias",
      fr: "Shesley Ramirez Garfias",
      it: "Shesley Ramirez Garfias",
      zh: "Shesley Ramirez Garfias",
      ja: "Shesley Ramirez Garfias",
      ru: "Shesley Ramirez Garfias",
    },
    lat: 18.7735671,
    lng: -98.541956,
    type: "ofrenda",
  },
  {
    id: 4,
    name: {
      es: "Erick Santiago Coria Blas",
      en: "Erick Santiago Coria Blas",
      de: "Erick Santiago Coria Blas",
      fr: "Erick Santiago Coria Blas",
      it: "Erick Santiago Coria Blas",
      zh: "Erick Santiago Coria Blas",
      ja: "Erick Santiago Coria Blas",
      ru: "Erick Santiago Coria Blas",
    },
    lat: 18.7724005,
    lng: -98.5422843,
    type: "ofrenda",
  },
  {
    id: 5,
    name: {
      es: "Eliseo Sarmiento Salamanca",
      en: "Eliseo Sarmiento Salamanca",
      de: "Eliseo Sarmiento Salamanca",
      fr: "Eliseo Sarmiento Salamanca",
      it: "Eliseo Sarmiento Salamanca",
      zh: "Eliseo Sarmiento Salamanca",
      ja: "Eliseo Sarmiento Salamanca",
      ru: "Eliseo Sarmiento Salamanca",
    },
    lat: 18.7682538,
    lng: -98.5376661,
    type: "ofrenda",
  },
  {
    id: 6,
    name: {
      es: "Catalina Mendoza Marquez",
      en: "Catalina Mendoza Marquez",
      de: "Catalina Mendoza Marquez",
      fr: "Catalina Mendoza Marquez",
      it: "Catalina Mendoza Marquez",
      zh: "Catalina Mendoza Marquez",
      ja: "Catalina Mendoza Marquez",
      ru: "Catalina Mendoza Marquez",
    },
    lat: 18.7686442,
    lng: -98.5380289,
    type: "ofrenda",
  },
  {
    id: 7,
    name: {
      es: "Juanita Romero Luna",
      en: "Juanita Romero Luna",
      de: "Juanita Romero Luna",
      fr: "Juanita Romero Luna",
      it: "Juanita Romero Luna",
      zh: "Juanita Romero Luna",
      ja: "Juanita Romero Luna",
      ru: "Juanita Romero Luna",
    },
    lat: 18.7700619,
    lng: -98.5378233,
    type: "ofrenda",
  },
  {
    id: 8,
    name: {
      es: "Mariano Chiquillo Olivan",
      en: "Mariano Chiquillo Olivan",
      de: "Mariano Chiquillo Olivan",
      fr: "Mariano Chiquillo Olivan",
      it: "Mariano Chiquillo Olivan",
      zh: "Mariano Chiquillo Olivan",
      ja: "Mariano Chiquillo Olivan",
      ru: "Mariano Chiquillo Olivan",
    },
    lat: 18.7703049,
    lng: -98.5377286,
    type: "ofrenda",
  },
  {
    id: 9,
    name: {
      es: "Leonides Rubi Martinez",
      en: "Leonides Rubi Martinez",
      de: "Leonides Rubi Martinez",
      fr: "Leonides Rubi Martinez",
      it: "Leonides Rubi Martinez",
      zh: "Leonides Rubi Martinez",
      ja: "Leonides Rubi Martinez",
      ru: "Leonides Rubi Martinez",
    },
    lat: 18.7685211,
    lng: -98.5393794,
    type: "ofrenda",
  },
  {
    id: 10,
    name: {
      es: "Raquel Tapia Llamas",
      en: "Raquel Tapia Llamas",
      de: "Raquel Tapia Llamas",
      fr: "Raquel Tapia Llamas",
      it: "Raquel Tapia Llamas",
      zh: "Raquel Tapia Llamas",
      ja: "Raquel Tapia Llamas",
      ru: "Raquel Tapia Llamas",
    },
    lat: 18.7665792,
    lng: -98.5402579,
    type: "ofrenda",
  },
  {
    id: 11,
    name: {
      es: "Rogerio Bautista Poblano",
      en: "Rogerio Bautista Poblano",
      de: "Rogerio Bautista Poblano",
      fr: "Rogerio Bautista Poblano",
      it: "Rogerio Bautista Poblano",
      zh: "Rogerio Bautista Poblano",
      ja: "Rogerio Bautista Poblano",
      ru: "Rogerio Bautista Poblano",
    },
    lat: 18.7660112,
    lng: -98.5403811,
    type: "ofrenda",
  },
  {
    id: 12,
    name: {
      es: "Lorenzo Vargas Vargas",
      en: "Lorenzo Vargas Vargas",
      de: "Lorenzo Vargas Vargas",
      fr: "Lorenzo Vargas Vargas",
      it: "Lorenzo Vargas Vargas",
      zh: "Lorenzo Vargas Vargas",
      ja: "Lorenzo Vargas Vargas",
      ru: "Lorenzo Vargas Vargas",
    },
    lat: 18.7669344,
    lng: -98.5406118,
    type: "ofrenda",
  },
  {
    id: 13,
    name: {
      es: "Antonio Jimenez Sedeño",
      en: "Antonio Jimenez Sedeño",
      de: "Antonio Jimenez Sedeño",
      fr: "Antonio Jimenez Sedeño",
      it: "Antonio Jimenez Sedeño",
      zh: "Antonio Jimenez Sedeño",
      ja: "Antonio Jimenez Sedeño",
      ru: "Antonio Jimenez Sedeño",
    },
    lat: 18.7672629,
    lng: -98.5431261,
    type: "ofrenda",
  },
  {
    id: 14,
    name: {
      es: "Benito Medina Cervantes",
      en: "Benito Medina Cervantes",
      de: "Benito Medina Cervantes",
      fr: "Benito Medina Cervantes",
      it: "Benito Medina Cervantes",
      zh: "Benito Medina Cervantes",
      ja: "Benito Medina Cervantes",
      ru: "Benito Medina Cervantes",
    },
    lat: 18.7676308,
    lng: -98.5430646,
    type: "ofrenda",
  },
  {
    id: 15,
    name: {
      es: "Daniel Lopez Sedeño",
      en: "Daniel Lopez Sedeño",
      de: "Daniel Lopez Sedeño",
      fr: "Daniel Lopez Sedeño",
      it: "Daniel Lopez Sedeño",
      zh: "Daniel Lopez Sedeño",
      ja: "Daniel Lopez Sedeño",
      ru: "Daniel Lopez Sedeño",
    },
    lat: 18.770748,
    lng: -98.542181,
    type: "ofrenda",
  },
  {
    id: 16,
    name: {
      es: "Carlos Sanchez Rincon",
      en: "Carlos Sanchez Rincon",
      de: "Carlos Sanchez Rincon",
      fr: "Carlos Sanchez Rincon",
      it: "Carlos Sanchez Rincon",
      zh: "Carlos Sanchez Rincon",
      ja: "Carlos Sanchez Rincon",
      ru: "Carlos Sanchez Rincon",
    },
    lat: 18.7714078,
    lng: -98.5410944,
    type: "ofrenda",
  },
  {
    id: 17,
    name: {
      es: "Nicolas Zarate Mendoza",
      en: "Nicolas Zarate Mendoza",
      de: "Nicolas Zarate Mendoza",
      fr: "Nicolas Zarate Mendoza",
      it: "Nicolas Zarate Mendoza",
      zh: "Nicolas Zarate Mendoza",
      ja: "Nicolas Zarate Mendoza",
      ru: "Nicolas Zarate Mendoza",
    },
    lat: 18.7708121,
    lng: -98.5442643,
    type: "ofrenda",
  },
  {
    id: 18,
    name: {
      es: "Georgina Lopez Dominguez",
      en: "Georgina Lopez Dominguez",
      de: "Georgina Lopez Dominguez",
      fr: "Georgina Lopez Dominguez",
      it: "Georgina Lopez Dominguez",
      zh: "Georgina Lopez Dominguez",
      ja: "Georgina Lopez Dominguez",
      ru: "Georgina Lopez Dominguez",
    },
    lat: 18.7726782,
    lng: -98.5443786,
    type: "ofrenda",
  },
  {
    id: 19,
    name: {
      es: "Francisca Moreno Fuentes",
      en: "Francisca Moreno Fuentes",
      de: "Francisca Moreno Fuentes",
      fr: "Francisca Moreno Fuentes",
      it: "Francisca Moreno Fuentes",
      zh: "Francisca Moreno Fuentes",
      ja: "Francisca Moreno Fuentes",
      ru: "Francisca Moreno Fuentes",
    },
    lat: 18.7733002,
    lng: -98.5455977,
    type: "ofrenda",
  },
  {
    id: 20,
    name: {
      es: "Elena Dolores Vega",
      en: "Elena Dolores Vega",
      de: "Elena Dolores Vega",
      fr: "Elena Dolores Vega",
      it: "Elena Dolores Vega",
      zh: "Elena Dolores Vega",
      ja: "Elena Dolores Vega",
      ru: "Elena Dolores Vega",
    },
    lat: 18.7743992,
    lng: -98.5453824,
    type: "ofrenda",
  },
  {
    id: 21,
    name: {
      es: "Enedino Reyes Cojtla",
      en: "Enedino Reyes Cojtla",
      de: "Enedino Reyes Cojtla",
      fr: "Enedino Reyes Cojtla",
      it: "Enedino Reyes Cojtla",
      zh: "Enedino Reyes Cojtla",
      ja: "Enedino Reyes Cojtla",
      ru: "Enedino Reyes Cojtla",
    },
    lat: 18.7758345,
    lng: -98.5455215,
    type: "ofrenda",
  },
  {
    id: 22,
    name: {
      es: "Esperanza Silva Melendez",
      en: "Esperanza Silva Melendez",
      de: "Esperanza Silva Melendez",
      fr: "Esperanza Silva Melendez",
      it: "Esperanza Silva Melendez",
      zh: "Esperanza Silva Melendez",
      ja: "Esperanza Silva Melendez",
      ru: "Esperanza Silva Melendez",
    },
    lat: 18.7759258,
    lng: -98.54627,
    type: "ofrenda",
  },
  {
    id: 23,
    name: {
      es: "Maria Luisa Perez Reyes",
      en: "Maria Luisa Perez Reyes",
      de: "Maria Luisa Perez Reyes",
      fr: "Maria Luisa Perez Reyes",
      it: "Maria Luisa Perez Reyes",
      zh: "Maria Luisa Perez Reyes",
      ja: "Maria Luisa Perez Reyes",
      ru: "Maria Luisa Perez Reyes",
    },
    lat: 18.7719441,
    lng: -98.5477344,
    type: "ofrenda",
  },
  {
    id: 24,
    name: {
      es: "Margarito Luis Juarez Alomirn",
      en: "Margarito Luis Juarez Alomirn",
      de: "Margarito Luis Juarez Alomirn",
      fr: "Margarito Luis Juarez Alomirn",
      it: "Margarito Luis Juarez Alomirn",
      zh: "Margarito Luis Juarez Alomirn",
      ja: "Margarito Luis Juarez Alomirn",
      ru: "Margarito Luis Juarez Alomirn",
    },
    lat: 18.773241,
    lng: -98.548388,
    type: "ofrenda",
  },
  {
    id: 25,
    name: {
      es: "Julio Tapia Ramos",
      en: "Julio Tapia Ramos",
      de: "Julio Tapia Ramos",
      fr: "Julio Tapia Ramos",
      it: "Julio Tapia Ramos",
      zh: "Julio Tapia Ramos",
      ja: "Julio Tapia Ramos",
      ru: "Julio Tapia Ramos",
    },
    lat: 18.7733378,
    lng: -98.5490643,
    type: "ofrenda",
  },
  {
    id: 26,
    name: {
      es: "Juana Carvente Sarmiento",
      en: "Juana Carvente Sarmiento",
      de: "Juana Carvente Sarmiento",
      fr: "Juana Carvente Sarmiento",
      it: "Juana Carvente Sarmiento",
      zh: "Juana Carvente Sarmiento",
      ja: "Juana Carvente Sarmiento",
      ru: "Juana Carvente Sarmiento",
    },
    lat: 18.7752076,
    lng: -98.5501078,
    type: "ofrenda",
  },
  {
    id: 27,
    name: {
      es: "Altar de Catastro",
      en: "Altar de Catastro",
      de: "Altar de Catastro",
      fr: "Altar de Catastro",
      it: "Altar de Catastro",
      zh: "Altar de Catastro",
      ja: "Altar de Catastro",
      ru: "Altar de Catastro",
    },
    lat: 18.7695355,
    lng: -98.5415053,
    type: "ofrenda",
  },
  {
    id: 28,
    name: {
      es: "Altar de Ex Convento",
      en: "Altar de Ex Convento",
      de: "Altar de Ex Convento",
      fr: "Altar de Ex Convento",
      it: "Altar de Ex Convento",
      zh: "Altar de Ex Convento",
      ja: "Altar de Ex Convento",
      ru: "Altar de Ex Convento",
    },
    lat: 18.7701301,
    lng: -98.5414447,
    type: "ofrenda",
  },
  {
    id: 29,
    name: {
      es: "Altar de Presidencia",
      en: "Altar de Presidencia",
      de: "Altar de Presidencia",
      fr: "Altar de Presidencia",
      it: "Altar de Presidencia",
      zh: "Altar de Presidencia",
      ja: "Altar de Presidencia",
      ru: "Altar de Presidencia",
    },
    lat: 18.7706209,
    lng: -98.5414261,
    type: "ofrenda",
  },
  {
    id: 30,
    name: {
      es: "Módulo información",
      en: "Information Module",
      de: "Informationsmodul",
      fr: "Module d'information",
      it: "Modulo informativo",
      zh: "信息模块",
      ja: "情報モジュール",
      ru: "Информационный модуль",
    },
    lat: 18.7704051,
    lng: -98.541396,
    type: "information",
  },
  {
    id: 31,
    name: {
      es: "Módulo información",
      en: "Information Module",
      de: "Informationsmodul",
      fr: "Module d'information",
      it: "Modulo informativo",
      zh: "信息模块",
      ja: "情報モジュール",
      ru: "Информационный модуль",
    },
    lat: 18.7698209,
    lng: -98.5415327,
    type: "information",
  },
  {
    id: 32,
    name: {
      es: "Estacionamiento",
      en: "Parking",
      de: "Parkplatz",
      fr: "Parking",
      it: "Parcheggio",
      zh: "停车场",
      ja: "駐車場",
      ru: "Парковка",
    },
    lat: 18.767523,
    lng: -98.5400888,
    type: "parking",
  },
  {
    id: 33,
    name: {
      es: "Hotel",
      en: "Hotel",
      de: "Hotel",
      fr: "Hôtel",
      it: "Hotel",
      zh: "酒店",
      ja: "ホテル",
      ru: "Отель",
    },
    lat: 18.7715102,
    lng: -98.5410685,
    type: "hotel",
  },
  {
    id: "route1",
    name: {
      es: "Camino de Flores",
      en: "Path of Flowers",
      de: "Blumenweg",
      fr: "Chemin des Fleurs",
      it: "Cammino dei Fiori",
      zh: "鲜花之路",
      ja: "花の道",
      ru: "Цветочная дорожка",
    },
    type: "route",
    lat: 18.768804,
    lng: -98.540597,
    description: {
      es: "Recorrido principal de entrada de flores, donde podrás ver hermosos arcos y decoraciones florales tradicionales. Un espectacular camino adornado con flores de cempasúchil y diferentes tipos de flores tradicionales.",
      en: "Main flower entrance route, where you can see beautiful arches and traditional floral decorations. A spectacular path adorned with marigold flowers and different types of traditional flowers.",
      de: "Haupteingang mit Blumen, wo Sie schöne Bögen und traditionelle Blumendekorationen sehen können. Ein spektakulärer Weg, geschmückt mit Ringelblumen und verschiedenen traditionellen Blumen.",
      fr: "Route principale d'entrée de fleurs, où vous pouvez voir de beaux arcs et des décorations florales traditionnelles. Un chemin spectaculaire orné de fleurs de souci et différents types de fleurs traditionnelles.",
      it: "Percorso principale d'ingresso fiorito, dove potrai vedere bellissimi archi e decorazioni floreali tradizionali. Un sentiero spettacolare adornato con fiori di calendula e diversi tipi di fiori tradizionali.",
      zh: "主要花卉入口路线，在这里您可以看到美丽的拱门和传统的花卉装饰。一条壮观的小路，装饰着万寿菊和各种传统花卉。",
      ja: "美しいアーチと伝統的な花の装飾を見ることができる、メインフラワーエントランスルート。マリーゴールドの花とさまざまな伝統的な花で飾られた壮観な道。",
      ru: "Главный цветочный входной маршрут, где вы можете увидеть красивые арки и традиционные цветочные украшения. Впечатляющая дорожка, украшенная цветами календулы и различными традиционными цветами.",
    },
    routePoints: [
      [18.768565, -98.5398857],
      [18.768815, -98.541554],
      [18.769732, -98.541468],
    ],
    routeColor: "#FF4136",
    image: "/arcos.png",
  },
  {
    id: "route2",
    name: {
      es: "Calle de las Tumbas Artificiales",
      en: "Street of Artificial Tombs",
      de: "Straße der künstlichen Gräber",
      fr: "Rue des Tombes Artificielles",
      it: "Via delle Tombe Artificiali",
      zh: "人造墓穴街",
      ja: "人工墓の通り",
      ru: "Улица искусственных гробниц",
    },
    type: "route",
    lat: 18.7714078,
    lng: -98.5410944,
    description: {
      es: "Recorrido por la calle donde encontrarás impresionantes tumbas artificiales y decoraciones tradicionales del Día de Muertos.",
      en: "A route through the street where you'll find impressive artificial tombs and traditional Day of the Dead decorations.",
      de: "Eine Route durch die Straße, wo Sie beeindruckende künstliche Gräber und traditionelle Tag-der-Toten-Dekorationen finden.",
      fr: "Un parcours dans la rue où vous trouverez d'impressionnantes tombes artificielles et des décorations traditionnelles du Jour des Morts.",
      it: "Un percorso attraverso la strada dove troverai impressionanti tombe artificiali e decorazioni tradizionali del Giorno dei Morti.",
      zh: "穿过街道的路线，在那里您会发现令人印象深刻的人造墓穴和传统的亡灵节装饰。",
      ja: "印象的な人工墓と伝統的な死者の日の装飾が見られる通りのルート。",
      ru: "Маршрут по улице, где вы найдете впечатляющие искусственные гробницы и традиционные украшения Дня мертвых.",
    },
    routePoints: [
      [18.770577, -98.541242],
      [18.770329, -98.539604],
    ],
    routeColor: "#7FDBFF",
    image: "/arcos.png",
  },
  {
    id: 34,
    name: {
      es: "Zona de Eventos",
      en: "Event Zone",
      de: "Veranstaltungszone",
      fr: "Zone d'Événements",
      it: "Zona Eventi",
      zh: "活动区",
      ja: "イベントゾーン",
      ru: "Зона мероприятий",
    },
    type: "information",
    lat: 18.770205,
    lng: -98.541567,
    description: {
      es: "Área principal para eventos y presentaciones culturales durante la celebración del Día de Muertos.",
      en: "Main area for events and cultural presentations during the Day of the Dead celebration.",
      de: "Hauptbereich für Veranstaltungen und kulturelle Präsentationen während der Tag-der-Toten-Feier.",
      fr: "Zone principale pour les événements et les présentations culturelles pendant la célébration du Jour des Morts.",
      it: "Area principale per eventi e presentazioni culturali durante la celebrazione del Giorno dei Morti.",
      zh: "亡灵节庆祝活动期间的主要活动和文化展示区域。",
      ja: "死者の日の祝祭中のイベントや文化プレゼンテーションのメインエリア。",
      ru: "Основная зона для мероприятий и культурных презентаций во время празднования Дня мертвых.",
    },
  },
]);

export const info = writable<any>([]);
