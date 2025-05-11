import { writable } from "svelte/store";
import type { LanguageKey } from "./generals";

export interface Location {
  id: number | string;
  name: {
    es: string;
    en: string;
  };
  type: "ofrenda" | "information" | "parking" | "hotel" | "route";
  lat: number;
  lng: number;
  description?: {
    es: string;
    en: string;
  };
  // Para rutas
  routePoints?: [number, number][];
  routeColor?: string;
  // Para puntos de interés en la ruta
  points?: {
    name: {
      es: string;
      en: string;
    };
    description: {
      es: string;
      en: string;
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
    },
    lat: 18.7752076,
    lng: -98.5501078,
    type: "ofrenda",
  },
  {
    id: 27,
    name: {
      es: "Altar de Catastro",
      en: "Cadastre Altar",
    },
    lat: 18.7695355,
    lng: -98.5415053,
    type: "ofrenda",
  },
  {
    id: 28,
    name: {
      es: "Altar de Ex Convento",
      en: "Former Convent Altar",
    },
    lat: 18.7701301,
    lng: -98.5414447,
    type: "ofrenda",
  },
  {
    id: 29,
    name: {
      es: "Altar de Presidencia",
      en: "Presidency Altar",
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
    },
    type: "route",
    lat: 18.768804,
    lng: -98.540597,
    description: {
      es: "Recorrido principal de entrada de flores, donde podrás ver hermosos arcos y decoraciones florales tradicionales. Un espectacular camino adornado con flores de cempasúchil y diferentes tipos de flores tradicionales.",
      en: "Main flower entrance route, where you can see beautiful arches and traditional floral decorations. A spectacular path adorned with marigold flowers and different types of traditional flowers.",
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
    },
    type: "route",
    lat: 18.7714078,
    lng: -98.5410944,
    description: {
      es: "Recorrido por la calle donde encontrarás impresionantes tumbas artificiales y decoraciones tradicionales del Día de Muertos.",
      en: "A route through the street where you'll find impressive artificial tombs and traditional Day of the Dead decorations.",
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
    },
    type: "information",
    lat: 18.770205,
    lng: -98.541567,
    description: {
      es: "Área principal para eventos y presentaciones culturales durante la celebración del Día de Muertos.",
      en: "Main area for events and cultural presentations during the Day of the Dead celebration.",
    },
  },
]);

export const info = writable<any>([]);
