<script lang="ts">
  import { page } from "$app/stores";
  import { locations } from "$lib/stores/ofrendas";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { selectedLanguage } from "$lib/stores/generals";
  import type { LanguageKey } from "$lib/stores/generals";

  let ofrenda = $state<any>(null);

  // Traducciones para la página
  const pageTranslations = {
    es: {
      backToMap: "Volver al mapa",
      information: "Información",
      type: "Tipo",
      location: "Ubicación",
      gallery: "Galería",
      comingSoon: "Imágenes próximamente",
      types: {
        ofrenda: "Ofrenda",
        information: "Información",
        parking: "Estacionamiento",
        hotel: "Hotel",
        route: "Ruta"
      }
    },
    en: {
      backToMap: "Back to map",
      information: "Information",
      type: "Type",
      location: "Location",
      gallery: "Gallery",
      comingSoon: "Images coming soon",
      types: {
        ofrenda: "Offering",
        information: "Information",
        parking: "Parking",
        hotel: "Hotel",
        route: "Route"
      }
    }
  } as const;

  type PageLanguageKey = keyof typeof pageTranslations;

  onMount(() => {
    const id = $page.params.id;
    ofrenda = $locations.find((l: any) => l.id.toString() === id);
    
    if (!ofrenda) {
      goto("/");
    }
  });
</script>

{#if ofrenda}
<div class="container mx-auto px-4 py-8">
  <button 
    class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onclick={() => goto("/")}
  >
    {pageTranslations[$selectedLanguage as PageLanguageKey].backToMap}
  </button>

  <div class="bg-white rounded-lg shadow-lg p-6">
    <h1 class="text-3xl font-bold mb-4">{ofrenda.name[$selectedLanguage as PageLanguageKey]}</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">{pageTranslations[$selectedLanguage as PageLanguageKey].information}</h2>
        <p class="text-gray-600">{pageTranslations[$selectedLanguage as PageLanguageKey].type}: {pageTranslations[$selectedLanguage as PageLanguageKey].types[ofrenda.type]}</p>
        <p class="text-gray-600">{pageTranslations[$selectedLanguage as PageLanguageKey].location}: {ofrenda.lat}, {ofrenda.lng}</p>
        {#if ofrenda.description}
          <p class="text-gray-600 mt-2">{ofrenda.description[$selectedLanguage as PageLanguageKey]}</p>
        {/if}
      </div>
      
      <div>
        <h2 class="text-xl font-semibold mb-2">{pageTranslations[$selectedLanguage as PageLanguageKey].gallery}</h2>
        <div class="bg-gray-100 rounded p-4 text-center">
          <p class="text-gray-500">{pageTranslations[$selectedLanguage as PageLanguageKey].comingSoon}</p>
        </div>
      </div>
    </div>
  </div>
</div>
{/if} 