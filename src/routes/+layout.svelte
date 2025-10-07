<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { get } from "svelte/store";

  import "../app.css";
  import { sidebarOpen, selectedFilter, selectedLanguage, translations, type LanguageKey } from "$lib/stores/generals";
  import { onMount } from "svelte";
  import AppSidebar from "$lib/components/app/sidebar/app-sidebar.svelte";

  let { children } = $props();
  let t = $state(translations.es);

  onMount(() => {
    sidebarOpen.set(
      localStorage.getItem("sidebarOpen") === "true" ? true : false
    );
    // Recuperar idioma guardado
    const savedLanguage = (localStorage.getItem("language") || "es") as LanguageKey;
    selectedLanguage.set(savedLanguage);
    t = translations[savedLanguage];
  });

  // Manejar cambios de idioma
  $effect(() => {
    localStorage.setItem("language", $selectedLanguage);
    t = translations[$selectedLanguage as keyof typeof translations];
  });
</script>

<svelte:head>
  <title>Ofrendas Huaquechula</title>
  <meta name="description" content="Explora las ofrendas monumentales del Día de Muertos en Huaquechula, Puebla" />
</svelte:head>

<Sidebar.Provider style="--sidebar-width: 280px;">
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-2 border-b bg-background px-4"
    >
      <div class="flex h-16 items-center gap-4">
        <!-- <Sidebar.Trigger
          class="-ml-1"
          onclick={(e) => {
            const item = get(sidebarOpen);
            console.log(item);
            localStorage.setItem("sidebarOpen", item.toString());
            e.preventDefault();
          }}
        />
        <img src="/logo.png" alt="Logo" class="h-8" /> -->
      </div>

      <div class="flex items-center gap-4">
        <select bind:value={$selectedFilter} class="border rounded p-2 text-sm">
          <option value="all">{t.all}</option>
          <option value="ofrenda">{t.offerings}</option>
          <option value="route">{t.routes}</option>
          <option value="information">{t.information}</option>
          <option value="parking">{t.parking}</option>
          <option value="hotel">{t.hotel}</option>
        </select>

        <select bind:value={$selectedLanguage} class="border rounded p-2 text-sm">
          <option value="es">{t.spanish}</option>
          <option value="en">{t.english}</option>
          <option value="de">{t.german}</option>
          <option value="fr">{t.french}</option>
          <option value="it">{t.italian}</option>
          <option value="zh">{t.chinese}</option>
          <option value="ja">{t.japanese}</option>
          <option value="ru">{t.russian}</option>
        </select>
      </div>
    </header>
    <div class="max-w-none md:container md:mx-auto 2xl:mx-0 2xl:max-w-none">
      {@render children()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
