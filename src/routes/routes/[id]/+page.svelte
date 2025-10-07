<script lang="ts">
  import { page } from "$app/stores";
  import { locations } from "$lib/stores/ofrendas";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { selectedLanguage } from "$lib/stores/generals";
  import type { LanguageKey } from "$lib/stores/generals";

  let route = $state<any>(null);
  let mapElement = $state<HTMLElement>();
  let map: L.Map | null = null;
  let selectedPoint = $state<any>(null);

  // Traducciones para la página
  const pageTranslations = {
    es: {
      backToMap: "Volver al mapa",
      description: "Descripción",
      routeInfo: "Información del recorrido",
      startPoint: "Punto de inicio",
      endPoint: "Punto final",
      approxLength: "Longitud aproximada",
      meters: "metros",
      estimatedTime: "Tiempo estimado de recorrido",
      walkingMinutes: "minutos caminando",
      pointsOfInterest: "Puntos de interés",
      viewDetails: "Ver detalles completos"
    },
    en: {
      backToMap: "Back to map",
      description: "Description",
      routeInfo: "Route Information",
      startPoint: "Start point",
      endPoint: "End point",
      approxLength: "Approximate length",
      meters: "meters",
      estimatedTime: "Estimated time",
      walkingMinutes: "walking minutes",
      pointsOfInterest: "Points of Interest",
      viewDetails: "View full details"
    },
    de: {
      backToMap: "Zurück zur Karte",
      description: "Beschreibung",
      routeInfo: "Routeninformation",
      startPoint: "Startpunkt",
      endPoint: "Endpunkt",
      approxLength: "Ungefähre Länge",
      meters: "Meter",
      estimatedTime: "Geschätzte Zeit",
      walkingMinutes: "Gehminuten",
      pointsOfInterest: "Sehenswürdigkeiten",
      viewDetails: "Vollständige Details anzeigen"
    },
    fr: {
      backToMap: "Retour à la carte",
      description: "Description",
      routeInfo: "Informations sur l'itinéraire",
      startPoint: "Point de départ",
      endPoint: "Point d'arrivée",
      approxLength: "Longueur approximative",
      meters: "mètres",
      estimatedTime: "Temps estimé",
      walkingMinutes: "minutes de marche",
      pointsOfInterest: "Points d'intérêt",
      viewDetails: "Voir les détails complets"
    },
    it: {
      backToMap: "Torna alla mappa",
      description: "Descrizione",
      routeInfo: "Informazioni sul percorso",
      startPoint: "Punto di partenza",
      endPoint: "Punto finale",
      approxLength: "Lunghezza approssimativa",
      meters: "metri",
      estimatedTime: "Tempo stimato",
      walkingMinutes: "minuti a piedi",
      pointsOfInterest: "Punti di interesse",
      viewDetails: "Vedi dettagli completi"
    },
    zh: {
      backToMap: "返回地图",
      description: "描述",
      routeInfo: "路线信息",
      startPoint: "起点",
      endPoint: "终点",
      approxLength: "大约长度",
      meters: "米",
      estimatedTime: "预计时间",
      walkingMinutes: "步行分钟",
      pointsOfInterest: "兴趣点",
      viewDetails: "查看完整详情"
    },
    ja: {
      backToMap: "地図に戻る",
      description: "説明",
      routeInfo: "ルート情報",
      startPoint: "出発点",
      endPoint: "終点",
      approxLength: "おおよその長さ",
      meters: "メートル",
      estimatedTime: "推定時間",
      walkingMinutes: "徒歩分",
      pointsOfInterest: "観光スポット",
      viewDetails: "詳細を見る"
    },
    ru: {
      backToMap: "Вернуться к карте",
      description: "Описание",
      routeInfo: "Информация о маршруте",
      startPoint: "Начальная точка",
      endPoint: "Конечная точка",
      approxLength: "Приблизительная длина",
      meters: "метров",
      estimatedTime: "Расчетное время",
      walkingMinutes: "минут ходьбы",
      pointsOfInterest: "Достопримечательности",
      viewDetails: "Посмотреть полную информацию"
    }
  } as const;

  type PageLanguageKey = keyof typeof pageTranslations;

  onMount(() => {
    const id = $page.params.id;
    route = $locations.find((l: any) => l.id === id && l.type === 'route');
    
    if (!route || !mapElement) {
      if (!route) goto("/");
      return;
    }

    // Inicializar mapa
    map = L.map(mapElement).setView([route.lat, route.lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Dibujar la ruta
    if (route.routePoints && map) {
      const polyline = L.polyline(route.routePoints, {
        color: route.routeColor || '#FF4136',
        weight: 5,
        opacity: 0.7
      }).addTo(map);

      // Agregar tooltip y popup a la ruta completa
      polyline
        .bindTooltip(route.name[$selectedLanguage as PageLanguageKey], {
          sticky: true,
          opacity: 0.9
        })
        .bindPopup(() => {
          const popupContent = document.createElement('div');
          popupContent.className = 'flex flex-col gap-4 min-w-[300px]';
          
          // Contenido del popup
          popupContent.innerHTML = `
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold">${route.name[$selectedLanguage as PageLanguageKey]}</h3>
              <p class="text-sm text-gray-600">${route.description[$selectedLanguage as PageLanguageKey]}</p>
              ${route.points ? `
                <div class="mt-2">
                  <h4 class="font-semibold mb-2">${pageTranslations[$selectedLanguage as PageLanguageKey].pointsOfInterest}:</h4>
                  <ul class="list-disc list-inside space-y-1">
                    ${route.points.map((point: any) => `
                      <li class="text-sm">
                        <span class="font-medium">${point.name[$selectedLanguage as PageLanguageKey]}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
              <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mt-2"
                onclick="window.location.href='/routes/${route.id}'"
              >
                ${pageTranslations[$selectedLanguage as PageLanguageKey].viewDetails}
              </button>
            </div>
          `;

          return popupContent;
        }, {
          maxWidth: 400,
          className: 'route-popup'
        });

      // Hacer la línea más interactiva
      polyline.on('mouseover', function(e) {
        if (!polyline.isPopupOpen()) {
          polyline.setStyle({
            weight: 8,
            opacity: 0.8
          });
        }
      });

      polyline.on('mouseout', function(e) {
        if (!polyline.isPopupOpen()) {
          polyline.setStyle({
            weight: 5,
            opacity: 0.7
          });
        }
      });

      // Ajustar el mapa para mostrar toda la ruta
      map.fitBounds(polyline.getBounds());
    }

    return () => map?.remove();
  });

  function calculateRouteLength(points?: [number, number][]): number {
    if (!points || points.length < 2) return 0;
    
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      const [lat1, lon1] = points[i - 1];
      const [lat2, lon2] = points[i];
      length += calculateDistance(lat1, lon1, lat2, lon2);
    }
    
    return Math.round(length);
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la tierra en metros
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  function calculateEstimatedTime(points?: [number, number][]): number {
    const length = calculateRouteLength(points);
    const walkingSpeedMPS = 1.4; // Velocidad promedio caminando en metros por segundo
    const timeSeconds = length / walkingSpeedMPS;
    return Math.round(timeSeconds / 60); // Convertir a minutos
  }

  function formatCoordinates(lat: number, lng: number): string {
    const latDir = lat >= 0 ? "N" : "S";
    const lngDir = lng >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(6)}° ${latDir}, ${Math.abs(lng).toFixed(6)}° ${lngDir}`;
  }
</script>

<svelte:head>
  {#if route}
    <title>{route.name[$selectedLanguage as PageLanguageKey]} - Ofrendas Huaquechula</title>
  {/if}
</svelte:head>

{#if route}
<div class="container mx-auto px-4 py-8">
  <a 
    class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    href="/"
  >
    {pageTranslations[$selectedLanguage as PageLanguageKey].backToMap}
  </a>

  <div class="bg-white rounded-lg shadow-lg p-6">
    <h1 class="text-3xl font-bold mb-4">{route.name[$selectedLanguage as PageLanguageKey]}</h1>
    
    <div class="grid grid-cols-1 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">{pageTranslations[$selectedLanguage as PageLanguageKey].description}</h2>
        <p class="text-gray-600 mb-4">{route.description[$selectedLanguage as PageLanguageKey]}</p>
        
        <div class="h-[400px] w-full rounded-lg overflow-hidden mb-4">
          <div bind:this={mapElement} class="h-full w-full"></div>
        </div>
      </div>
      
      <div>
        <h2 class="text-xl font-semibold mb-2">{pageTranslations[$selectedLanguage as PageLanguageKey].routeInfo}</h2>
        <div class="bg-gray-50 rounded-lg p-4 mb-4">
          <ul class="list-disc list-inside space-y-2">
            <li>{pageTranslations[$selectedLanguage as PageLanguageKey].startPoint}: {formatCoordinates(route.routePoints[0][0], route.routePoints[0][1])}</li>
            <li>{pageTranslations[$selectedLanguage as PageLanguageKey].endPoint}: {formatCoordinates(route.routePoints[route.routePoints.length - 1][0], route.routePoints[route.routePoints.length - 1][1])}</li>
            <li>{pageTranslations[$selectedLanguage as PageLanguageKey].approxLength}: {calculateRouteLength(route.routePoints)} {pageTranslations[$selectedLanguage as PageLanguageKey].meters}</li>
            <li>{pageTranslations[$selectedLanguage as PageLanguageKey].estimatedTime}: {calculateEstimatedTime(route.routePoints)} {pageTranslations[$selectedLanguage as PageLanguageKey].walkingMinutes}</li>
          </ul>
        </div>

        {#if route.points}
          <h2 class="text-xl font-semibold mb-2">{pageTranslations[$selectedLanguage as PageLanguageKey].pointsOfInterest}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each route.points as point (point.name[$selectedLanguage as PageLanguageKey])}
              <div class="bg-white rounded-lg shadow p-4">
                {#if point.image}
                  <img src={point.image} alt={point.name[$selectedLanguage as PageLanguageKey]} class="w-full h-48 object-cover rounded-lg mb-4" />
                {/if}
                <h3 class="text-lg font-semibold mb-2">{point.name[$selectedLanguage as PageLanguageKey]}</h3>
                <p class="text-gray-600 text-sm">{point.description[$selectedLanguage as PageLanguageKey]}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}

<style>
  :global(body) {
    @import 'leaflet/dist/leaflet.css';
  }

  :global(.route-popup .leaflet-popup-content) {
    margin: 16px;
  }

  :global(.route-popup .leaflet-popup-content-wrapper) {
    border-radius: 8px;
  }
</style> 