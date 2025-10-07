<script lang="ts">
  import Map from "$lib/components/map/map.svelte";
  import { selectedFilter } from "$lib/stores/generals";
</script>

<svelte:head>
  <title>Ofrendas Huaquechula</title>
  <meta name="description" content="Explora las ofrendas monumentales del Día de Muertos en Huaquechula, Puebla. Mapa interactivo con ubicaciones de ofrendas, rutas, hoteles y servicios." />
</svelte:head>

<section class="container mx-auto px-2 md:px-5">
  <Map bind:typeFilter={$selectedFilter} />
</section>
