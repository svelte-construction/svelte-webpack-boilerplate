<script>
  import { onMount } from 'svelte';
  import { links } from 'svelte-routing';

  onMount(() => console.log('The default page has been mounted!'));
</script>

<style src="./styles.pcss">

</style>

<div class="component" use:links>
  <h1 class="title">Hello from svelte boilerplate!</h1>
  <h2 class="description"><a href="/inner" class="link">Go to the inner page</a></h2>
</div>
