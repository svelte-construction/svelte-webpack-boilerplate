<script>
  import { onMount } from 'svelte';
  import { links } from 'svelte-routing';

  onMount(() => console.log('The inner page has been mounted!'));
</script>

<style src="./styles.pcss">

</style>

<div class="component" use:links>
  <h1 class="title">Hello from the inner page!</h1>
  <h2 class="description"><a href="/" class="link">Go back</a></h2>
</div>
