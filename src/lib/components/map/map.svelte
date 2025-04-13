<script lang="ts">
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
</style>
