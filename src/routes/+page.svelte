<script lang="ts">
  import Map from "$lib/components/map/map.svelte";
  import { selectedFilter } from "$lib/stores/generals";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container mx-auto px-2 md:px-5">
  <h1 class="text-2xl font-bold text-blue-400 my-4">Map</h1>
  <Map bind:typeFilter={$selectedFilter} />
</section>
