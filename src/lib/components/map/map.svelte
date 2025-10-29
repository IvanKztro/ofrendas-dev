<script lang="ts">
  import { onMount } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { locations } from "$lib/stores/ofrendas";
  import type { Location } from "$lib/stores/ofrendas";
  import { goto } from "$app/navigation";
  import { selectedLanguage } from "$lib/stores/generals";
  import type { Writable } from "svelte/store";
  import type { LanguageKey } from "$lib/stores/generals";

  let height = $state("h-[80dvh]");
  let width = $state("w-full");

  let { typeFilter = $bindable("all") } = $props();

  let mapElement: HTMLElement;
  let map = $state<L.Map | null>(null);
  let markerGroup = $state<L.LayerGroup | null>(null);
  let routeGroup = $state<L.LayerGroup | null>(null);
  let userMarker = $state<L.Marker | null>(null);
  let accuracyCircle = $state<L.Circle | null>(null);
  let userCoords = $state({ lat: 0, lng: 0 });

  // Traducciones para el mapa
  const mapTranslations = {
    es: {
      centerLocation: "Centrar en mi ubicación",
      viewDetails: "Ver detalles",
      routeStart: "Inicio del recorrido",
      routeEnd: "Fin del recorrido"
    },
    en: {
      centerLocation: "Center on my location",
      viewDetails: "View details",
      routeStart: "Route start",
      routeEnd: "Route end"
    },
    de: {
      centerLocation: "Auf meinen Standort zentrieren",
      viewDetails: "Details anzeigen",
      routeStart: "Routenbeginn",
      routeEnd: "Routenende"
    },
    fr: {
      centerLocation: "Centrer sur ma position",
      viewDetails: "Voir les détails",
      routeStart: "Début de l'itinéraire",
      routeEnd: "Fin de l'itinéraire"
    },
    it: {
      centerLocation: "Centra sulla mia posizione",
      viewDetails: "Vedi dettagli",
      routeStart: "Inizio del percorso",
      routeEnd: "Fine del percorso"
    },
    zh: {
      centerLocation: "定位到我的位置",
      viewDetails: "查看详情",
      routeStart: "路线起点",
      routeEnd: "路线终点"
    },
    ja: {
      centerLocation: "現在地を中心に",
      viewDetails: "詳細を見る",
      routeStart: "ルート開始",
      routeEnd: "ルート終了"
    },
    ru: {
      centerLocation: "Центрировать на моем местоположении",
      viewDetails: "Посмотреть детали",
      routeStart: "Начало маршрута",
      routeEnd: "Конец маршрута"
    }
  } as const;

  type MapLanguageKey = keyof typeof mapTranslations;

  function getIconForLocation(type: string) {
    return L.icon({
      iconUrl: type === "ofrenda" ? "/ofrenda.gif" : type === "route" ? "/route.png" : `/${type}.png`,
      iconSize: type === "parking" ? [35, 25] : [30, 30],
      iconAnchor: [12, 25],
    });
  }

  const startIcon = L.icon({
    iconUrl: '/start-flag.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const endIcon = L.icon({
    iconUrl: '/end-flag.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Crear un icono personalizado para el usuario
  function createUserIcon() {
    const svgIcon = `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Círculo exterior (borde blanco) -->
        <circle cx="20" cy="20" r="11" fill="white" filter="url(#shadow)"/>
        <!-- Círculo azul principal -->
        <circle cx="20" cy="20" r="9" fill="#3388ff"/>
      </svg>
    `;
    
    return L.divIcon({
      html: svgIcon,
      className: 'user-location-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  }

  function updateUserMarker() {
    if (!map || userCoords.lat === 0 || userCoords.lng === 0) return;

    const icon = createUserIcon();
    
    if (userMarker) {
      userMarker.setLatLng([userCoords.lat, userCoords.lng]);
    } else {
      userMarker = L.marker([userCoords.lat, userCoords.lng], {
        icon: icon,
        zIndexOffset: 1000
      }).addTo(map);
    }

    // Actualizar círculo de precisión
    if (accuracyCircle) {
      accuracyCircle.setLatLng([userCoords.lat, userCoords.lng]);
    }
  }

  function centerOnUser() {
    if (map && userCoords.lat !== 0 && userCoords.lng !== 0) {
      map.setView([userCoords.lat, userCoords.lng], 17);
    }
  }

  onMount(() => {
    map = L.map(mapElement).setView([18.770748, -98.542181], 15.55);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar el botón de localización
    const locationButton = new L.Control({ position: 'bottomright' });
    locationButton.onAdd = function() {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      div.innerHTML = `
        <button 
          class="bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none"
          title="${mapTranslations[$selectedLanguage as MapLanguageKey].centerLocation}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      `;
      div.onclick = centerOnUser;
      return div;
    };
    locationButton.addTo(map);

    markerGroup = L.layerGroup().addTo(map);
    routeGroup = L.layerGroup().addTo(map);
    showMarkers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };

          if (map) {
            // Crear círculo de precisión
            accuracyCircle = L.circle([userCoords.lat, userCoords.lng], {
              radius: pos.coords.accuracy,
              color: "#3388ff",
              fillColor: "#3388ff",
              fillOpacity: 0.1,
              weight: 1
            }).addTo(map);

            updateUserMarker();
            map.setView([userCoords.lat, userCoords.lng], 15.55);
          }
        },
        (err) => console.error("Error inicial de geolocalización:", err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      navigator.geolocation.watchPosition(
        (pos) => {
          userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };

          if (map) {
            // Actualizar círculo de precisión
            if (accuracyCircle) {
              accuracyCircle.setLatLng([userCoords.lat, userCoords.lng]);
              accuracyCircle.setRadius(pos.coords.accuracy);
            } else {
              accuracyCircle = L.circle([userCoords.lat, userCoords.lng], {
                radius: pos.coords.accuracy,
                color: "#3388ff",
                fillColor: "#3388ff",
                fillOpacity: 0.1,
                weight: 1
              }).addTo(map);
            }

            updateUserMarker();
          }
        },
        (err) => console.warn("Error en seguimiento de ubicación:", err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    return () => {
      map?.remove();
      markerGroup?.clearLayers();
      routeGroup?.clearLayers();
    };
  });

  function showMarkers() {
    if (!markerGroup || !routeGroup || !map) return;

    markerGroup.clearLayers();
    routeGroup.clearLayers();

    $locations
      .filter((l: Location) => typeFilter === "all" || l.type === typeFilter)
      .forEach((lugar: Location) => {
        if (lugar.type === 'route' && lugar.routePoints) {
          // Crear la polilínea para la ruta
          const polyline = L.polyline(lugar.routePoints, {
            color: lugar.routeColor || '#FF4136',
            weight: 8,
            opacity: 0.7
          });
          
          if (routeGroup) {
            polyline.addTo(routeGroup);
          }

          // Hacer la polilínea interactiva
          polyline
            .bindTooltip(`
              <div class="flex flex-col items-center gap-2">
                ${lugar.image ? `<img src="${lugar.image}" alt="${lugar.name[$selectedLanguage as MapLanguageKey]}" class="w-8 h-8 object-contain" />` : ''}
                <span class="font-medium">${lugar.name[$selectedLanguage as MapLanguageKey]}</span>
              </div>
            `, {
              permanent: false,
              direction: 'auto',
              className: 'route-tooltip'
            })
            .bindPopup(`
              <div class="flex flex-col gap-4">
                ${lugar.image ? `
                  <div class="flex justify-center">
                    <img src="${lugar.image}" alt="${lugar.name[$selectedLanguage as MapLanguageKey]}" class="w-16 h-16 object-contain" />
                  </div>
                ` : ''}
                <div class="flex flex-col gap-2">
                  <b>${lugar.name[$selectedLanguage as MapLanguageKey]}</b>
                  <p class="text-sm text-gray-600">${lugar.description ? lugar.description[$selectedLanguage as MapLanguageKey] : ''}</p>
                  <button 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onclick="window.location.href='/routes/${lugar.id}'"
                  >
                    ${mapTranslations[$selectedLanguage as MapLanguageKey].viewDetails}
                  </button>
                </div>
              </div>
            `);

          // Eventos de hover para la polilínea
          polyline.on('mouseover', function(e) {
            polyline.setStyle({
              weight: 12,
              opacity: 0.8
            });
          });

          polyline.on('mouseout', function(e) {
            polyline.setStyle({
              weight: 8,
              opacity: 0.7
            });
          });
        } else {
          const popupContent = lugar.type === 'ofrenda' 
            ? `
              <div class="flex flex-col gap-2">
                <b>${lugar.id}.- ${lugar.name[$selectedLanguage as MapLanguageKey]}</b>
                <p>${lugar.type}</p>
                <button 
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onclick="window.location.href='/ofrendas/${lugar.id}'"
                >
                  ${mapTranslations[$selectedLanguage as MapLanguageKey].viewDetails}
                </button>
              </div>
            `
            : `<b>${lugar.name[$selectedLanguage as MapLanguageKey]}</b><br>${lugar.type}`;

          if (markerGroup) {
            const marker = L.marker([lugar.lat, lugar.lng], {
              icon: getIconForLocation(lugar.type)
            }).bindPopup(popupContent);
            markerGroup.addLayer(marker);
          }
        }
      });
  }

  $effect(() => {
    if (map && markerGroup) {
      showMarkers();
    }
  });

  // Actualizar marcadores cuando cambie el idioma
  $effect(() => {
    const lang = $selectedLanguage;
    if (map && markerGroup) {
      showMarkers();
    }
  });
</script>

<div bind:this={mapElement} class="{width} {height} rounded-lg z-0"></div>

<style>
  :global(body) {
    @import 'leaflet/dist/leaflet.css';
  }

  :global(.user-location-marker svg) {
    display: block;
  }
</style>


<!-- <script lang="ts">
  import { onMount } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import "leaflet.markercluster";
  import "leaflet-rotatedmarker";
  import { locations } from "$lib/stores/ofrendas";

  let height = $state("h-[80dvh]");
  let width = $state("w-full");
  let typeFilter = $state("all");

  let mapElement: HTMLElement;
  let map = $state<L.Map | null>(null);
  let markerGroup = $state<L.LayerGroup | null>(null);
  let userMarker = $state<L.CircleMarker | null>(null);
  let userCoords = $state({ lat: 0, lng: 0 });

  function getIconForLocation(type: string) {
    return L.icon({
      iconUrl: type === "ofrenda" ? "/ofrenda.gif" : `/${type}.png`,
      iconSize: type === "parking" ? [35, 25] : [30, 30],
      iconAnchor: [12, 25],
    });
  }

  onMount(() => {
    map = L.map(mapElement).setView([18.770748, -98.542181], 15.55);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markerGroup = L.layerGroup().addTo(map);

    showMarkers();

    if (navigator.geolocation) {
      // Primera ubicación rápida
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };

          userMarker = L.circleMarker([userCoords.lat, userCoords.lng], {
            color: "#3388ff",
            fillColor: "#3388ff",
            fillOpacity: 0.7,
            radius: 10
          }).addTo(map);

          map.setView([userCoords.lat, userCoords.lng], 15.55);
        },
        (err) => {
          console.error("Error inicial de geolocalización:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 segundos
          maximumAge: 0
        }
      );

      // Seguimiento en tiempo real
      navigator.geolocation.watchPosition(
        (pos) => {
          userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };

          if (userMarker) {
            userMarker.setLatLng([userCoords.lat, userCoords.lng]);
          } else {
            userMarker = L.circleMarker([userCoords.lat, userCoords.lng], {
              color: "#3388ff",
              fillColor: "#3388ff",
              fillOpacity: 0.7,
              radius: 10
            }).addTo(map);
          }
        },
        (err) => {
          console.warn("Error en el seguimiento de ubicación:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          distanceFilter: 1
        }
      );
    }

    return () => {
      map?.remove();
    };
  });

  function showMarkers() {
    if (!markerGroup) return;

    markerGroup.clearLayers();

    $locations
      .filter((l) => typeFilter === "all" || l.type === typeFilter)
      .forEach((lugar) => {
        const marker = L.marker([lugar.lat, lugar.lng], {
          icon: getIconForLocation(lugar.type)
        }).bindPopup(`<b>${lugar.name}</b><br>${lugar.type}`);
        markerGroup.addLayer(marker);
      });
  }

  $effect(() => {
    if (map && markerGroup) {
      showMarkers();
    }
  });
</script>

<div bind:this={mapElement} class="{width} {height} rounded-lg z-0"></div>

<style>
  @import 'leaflet/dist/leaflet.css';
</style> -->
