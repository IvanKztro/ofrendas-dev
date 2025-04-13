<script lang="ts">
  import Map from "$lib/components/map/map.svelte";
  let selected = $state("all");
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container mx-auto px-2 md:px-0">
  <h1 class="text-2xl font-bold text-blue-400 my-4">Map</h1>
  <div class="mb-4 flex items-center gap-4">
    <!-- <label for="tipo" class="text-sm font-semibold"></label> -->
    <select id="tipo" bind:value={selected} class="border rounded p-2 text-sm">
      <option value="all">Todos</option>
      <option value="ofrenda">Ofrendas</option>
      <option value="information">Información</option>
      <option value="parking">Estacionamiento</option>
      <option value="hotel">Hotel</option>
    </select>
  </div>
  <Map bind:typeFilter={selected} />
</section>
