<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { get } from "svelte/store";

  import "../app.css";
  import { sidebarOpen } from "$lib/stores/generals";
  import { onMount } from "svelte";
  import AppSidebar from "$lib/components/app/sidebar/app-sidebar.svelte";

  let { children } = $props();
  onMount(() => {
    sidebarOpen.set(
      localStorage.getItem("sidebarOpen") === "true" ? true : false
    );
  });

  // let sidebarOpen = $state(false);
</script>

<Sidebar.Provider style="--sidebar-width: 280px;">
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-2 border-b bg-background px-4"
    >
      <div class="flex h-16 items-center gap-2">
        <Sidebar.Trigger
          class="-ml-1"
          onclick={(e) => {
            const item = get(sidebarOpen);
            console.log(item);
            localStorage.setItem("sidebarOpen", item.toString());
            e.preventDefault();
          }}
        />
        <!-- <Separator orientation="vertical" class="mr-2 h-4" /> -->
        <!-- <Breadcrumb /> -->
      </div>

      <div class="flex items-center gap-2">
        <h3>ddd</h3>
        <!-- <Badge class="bg-primary px-3 py-1 text-xs md:text-[18px] ">BETA</Badge> -->

        <!-- <Notifications />
					<DarkModeToggle /> -->
      </div>
    </header>
    <div class="max-w-none md:container md:mx-auto 2xl:mx-0 2xl:max-w-none">
      {@render children()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
