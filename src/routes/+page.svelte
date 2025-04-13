<script lang="ts">
  import Map from "$lib/components/map/map.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container mx-auto px-2 md:px-0">
  <h1 class="text-2xl font-bold text-blue-400">Map</h1>
  <Map />
</section>
