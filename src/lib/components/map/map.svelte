<script lang="ts">
  import { onMount } from "svelte";
  import L from "leaflet";
  import type { Map, Marker, CircleMarker } from "leaflet";
  import "leaflet.markercluster";
  import "leaflet-rotatedmarker";
  //   import { locations } from "$lib/stores/ofrendas";
  import Spinner from "./spinner.svelte";
  import "leaflet/dist/leaflet.css";

  interface Location {
    id: number;
    name: string;
    lat: number;
    lng: number;
    type: string;
  }

  interface UserLocation {
    lat: number;
    lng: number;
  }

  const locations: Location[] = [
    //   {
    //     id: 1,
    //     name: "Roman Mendoza Arizpe",
    //     lng: 0,
    //     lat: 0,
    //     type: "ofrenda",
    //   },
    {
      id: 2,
      name: "Claudia Vega Gutierrez",
      lat: 18.7653794,
      lng: -98.5419528,
      type: "ofrenda",
    },
    {
      id: 3,
      name: "Shesley Ramirez Garfias",
      lat: 18.7735671,
      lng: -98.541956,
      type: "ofrenda",
    },
    {
      id: 4,
      name: "Erick Santiago Coria Blas",
      lat: 18.7724005,
      lng: -98.5422843,
      type: "ofrenda",
    },
    {
      id: 5,
      name: "Eliseo Sarmiento Salamanca",
      lat: 18.7682538,
      lng: -98.5376661,
      type: "ofrenda",
    },
    {
      id: 6,
      name: "Catalina Mendoza Marquez",
      lat: 18.7686442,
      lng: -98.5380289,
      type: "ofrenda",
    },
    {
      id: 7,
      name: "Juanita Romero Luna",
      lat: 18.7700619,
      lng: -98.5378233,
      type: "ofrenda",
    },
    {
      id: 8,
      name: "Mariano Chiquillo Olivan",
      lat: 18.7703049,
      lng: -98.5377286,
      type: "ofrenda",
    },
    {
      id: 9,
      name: "Leonides Rubi Martinez",
      lat: 18.7685211,
      lng: -98.5393794,
      type: "ofrenda",
    },
    {
      id: 10,
      name: "Raquel Tapia Llamas",
      lat: 18.7665792,
      lng: -98.5402579,
      type: "ofrenda",
    },
    {
      id: 11,
      name: "Rogerio Bautista Poblano",
      lat: 18.7660112,
      lng: -98.5403811,
      type: "ofrenda",
    },
    {
      id: 12,
      name: "Lorenzo Vargas Vargas",
      lat: 18.7669344,
      lng: -98.5406118,
      type: "ofrenda",
    },
    {
      id: 13,
      name: "Antonio Jimenez Sedeño",
      lat: 18.7672629,
      lng: -98.5431261,
      type: "ofrenda",
    },
    {
      id: 14,
      name: "Benito Medina Cervantes",
      lat: 18.7676308,
      lng: -98.5430646,
      type: "ofrenda",
    },
    {
      id: 15,
      name: "Daniel Lopez Sedeño",
      lat: 18.770748,
      lng: -98.542181,
      type: "ofrenda",
    },
    {
      id: 16,
      name: "Carlos Sanchez Rincon",
      lat: 18.7714078,
      lng: -98.5410944,
      type: "ofrenda",
    },
    {
      id: 17,
      name: "Nicolas Zarate Mendoza",
      lat: 18.7708121,
      lng: -98.5442643,
      type: "ofrenda",
    },
    {
      id: 18,
      name: "Georgina Lopez Dominguez",
      lat: 18.7726782,
      lng: -98.5443786,
      type: "ofrenda",
    },
    {
      id: 19,
      name: "Francisca Moreno Fuentes",
      lat: 18.7733002,
      lng: -98.5455977,
      type: "ofrenda",
    },
    {
      id: 20,
      name: "Elena Dolores Vega",
      lat: 18.7743992,
      lng: -98.5453824,
      type: "ofrenda",
    },
    {
      id: 21,
      name: "Enedino Reyes Cojtla",
      lat: 18.7758345,
      lng: -98.5455215,
      type: "ofrenda",
    },
    {
      id: 22,
      name: "Esperanza Silva Melendez",
      lat: 18.7759258,
      lng: -98.54627,
      type: "ofrenda",
    },
    {
      id: 23,
      name: "Maria Luisa Perez Reyes",
      lat: 18.7719441,
      lng: -98.5477344,
      type: "ofrenda",
    },
    {
      id: 24,
      name: "Margarito Luis Juarez Alomirn",
      lat: 18.773241,
      lng: -98.548388,
      type: "ofrenda",
    },
    {
      id: 25,
      name: "Julio Tapia Ramos",
      lat: 18.7733378,
      lng: -98.5490643,
      type: "ofrenda",
    },
    {
      id: 26,
      name: "Juana Carvente Sarmiento",
      lat: 18.7752076,
      lng: -98.5501078,
      type: "ofrenda",
    },
    {
      id: 27,
      name: "Altar de Catastro",
      lat: 18.7695355,
      lng: -98.5415053,
      type: "ofrenda",
    },
    {
      id: 28,
      name: "Altar de Ex Convento",
      lat: 18.7701301,
      lng: -98.5414447,
      type: "ofrenda",
    },
    {
      id: 29,
      name: "Altar de Presidencia",
      lat: 18.7706209,
      lng: -98.5414261,
      type: "ofrenda",
    },
    {
      id: 30,
      name: "Modulo información",
      lat: 18.7704051,
      lng: -98.541396,
      type: "information",
    },
    {
      id: 31,
      name: "Modulo información",
      lat: 18.7698209,
      lng: -98.5415327,
      type: "information",
    },
    {
      id: 32,
      name: "Estacionamiento",
      lat: 18.767523,
      lng: -98.5400888,
      type: "parking",
    },
    {
      id: 33,
      name: "Hotel",
      lat: 18.7715102,
      lng: -98.5410685,
      type: "hotel",
    },
  ];

  let map: L.Map | null = null;
  let userMarker: L.CircleMarker | null = null;
  let userCoords = $state({ lat: 0, lng: 0 });
  let ofrendas = $state<Location[]>([]);
  let informationstate = $state<Location[]>([]);
  let parking = $state<Location[]>([]);
  let hotels = $state<Location[]>([]);
  let markers: L.Marker[] = [];
  let autoCenter = $state(true);
  let selectedType = $state("all");
  let isLoading = $state(true);
  let userLocation: UserLocation | null = null;

  // Coordenadas por defecto del centro de Yecapixtla
  const DEFAULT_COORDS = {
    lat: 18.770748,
    lng: -98.542181,
  };

  onMount(() => {
    const mapInstance = L.map('map').setView([19.432608, -99.133209], 13);
    map = mapInstance;
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    // Add user location marker if available
    if (userLocation) {
      if (userMarker) {
        userMarker.remove();
      }
      userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.5,
        radius: 8
      });
      userMarker.addTo(mapInstance);
    }

    showMarkers(selectedType);
    isLoading = false;

    map.on("dragstart", () => {
      autoCenter = false;
    });

    // Intentar obtener la ubicación del usuario después de que el mapa esté listo
    if (navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: false, // Usar false para mejor compatibilidad
        maximumAge: 30000, // Permitir cache de 30 segundos
        timeout: 10000, // Aumentar el timeout a 10 segundos
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          userCoords.lat = position.coords.latitude;
          userCoords.lng = position.coords.longitude;

          if (map) {
            userMarker = L.circleMarker([userCoords.lat, userCoords.lng], {
              color: "#3388ff",
              fillColor: "#3388ff",
              fillOpacity: 0.7,
              radius: 10,
            }).addTo(map);

            if (autoCenter) {
              map.setView([userCoords.lat, userCoords.lng], 15.55);
            }
          }
        },
        (error) => {
          console.error("Error en la geolocalización:", error);
          // No hacer nada más, el mapa ya está mostrado con las coordenadas por defecto
        },
        geoOptions
      );

      // Watch position con las mismas opciones
      navigator.geolocation.watchPosition(
        (position) => {
          if (userMarker) {
            userCoords.lat = position.coords.latitude;
            userCoords.lng = position.coords.longitude;
            userMarker.setLatLng([userCoords.lat, userCoords.lng]);

            if (autoCenter) {
              map.panTo([userCoords.lat, userCoords.lng], { animate: true });
            }
          }
        },
        (error) => {
          console.error("Error en el seguimiento de ubicación:", error);
        },
        geoOptions
      );
    }
  });

  function getIconForLocation(type: string) {
    return L.icon({
      iconUrl: type === "ofrenda" ? "/ofrenda.gif" : `/${type}.png`,
      iconSize: type === "parking" ? [35, 25] : [30, 30],
      iconAnchor: [12, 25],
    });
  }

  function showMarkers(type: string) {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    // Filter and add new markers
    const filteredMarkers = type === 'all' 
      ? locations 
      : locations.filter(m => m.type === type);

    filteredMarkers.forEach(data => {
      const marker = L.marker([data.lat, data.lng], {
        icon: getIconForLocation(data.type)
      });
      marker.addTo(map);
      markers.push(marker);
    });
  }

  function centerOnUser() {
    autoCenter = true;
    if (userMarker) {
      map.setView([userCoords.lat, userCoords.lng], 15.55);
    } else {
      // Si no hay marcador de usuario, centrar en las coordenadas por defecto
      map.setView([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng], 15.55);
    }
  }
</script>

<h3 class="text-center text-black text-2xl">Ofrendas</h3>

{#if isLoading}
  <div class="flex items-center justify-center mt-[80px] h-[40dvh]">
    <Spinner />
  </div>
{:else}
  <div class="my-4 w-full flex gap-4 items-center">
    <select 
      bind:value={selectedType}
      onchange={(e: Event) => {
        const target = e.target as HTMLSelectElement;
        showMarkers(target.value);
      }}
      class="p-2 rounded-lg border border-gray-300"
    >
      <option value="all">Todos</option>
      <option value="ofrenda">Ofrendas</option>
      <option value="information">Información</option>
      <option value="parking">Estacionamiento</option>
      <option value="hotel">Hoteles</option>
    </select>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      onclick={centerOnUser}
      class="p-[8px] bg-blue-500 text-white rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-locate-fixed"
      >
        <line x1="2" x2="5" y1="12" y2="12" />
        <line x1="19" x2="22" y1="12" y2="12" />
        <line x1="12" x2="12" y1="2" y2="5" />
        <line x1="12" x2="12" y1="19" y2="22" />
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  </div>
{/if}

<div class={isLoading ? "invisible" : "visible"}>
  <div id="map" class="h-[70vh] w-full"></div>
</div>

<style>
  :global(.leaflet-container) {
    height: 100%;
    width: 100%;
  }
</style>
