<script lang="ts">
  // import NavUser from './nav-user.svelte';
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import { sidebarOpen } from "$lib/stores/generals";
  import { onMount, type ComponentProps } from "svelte";
  // import PortfoliosSidebar from './portfolios-sidebar.svelte';
  // import { sidebarOpen } from '$lib/stores/general';
  // import SidebarSecondary from './sidebar-secondary.svelte';
  import Calendar from "@lucide/svelte/icons/calendar";
  import House from "@lucide/svelte/icons/house";
  import Inbox from "@lucide/svelte/icons/inbox";
  import Search from "@lucide/svelte/icons/search";
  import Settings from "@lucide/svelte/icons/settings";
  let {
    ref = $bindable(null),
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();

  const sidebar = useSidebar();

  onMount(() => {
    console.log("sidebarOpen", $sidebarOpen);
    // if (!$sidebarOpen)
    sidebar.toggle();
  });

  const items = [
    {
      title: "Home",
      url: "#",
      icon: House,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
</script>

<!-- <Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root> -->
