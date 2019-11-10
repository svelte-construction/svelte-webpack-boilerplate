<script>
  import { Router, Route } from 'svelte-routing';
  import DefaultPage from './pages/DefaultPage';
  import InnerPage from './pages/InnerPage';
  import { STAGE, URI_DEFAULT, URI_INNER } from './constants';

  console.log(`Using stage '${STAGE}' to run the app.`);
</script>

<Router>
  <Route path={URI_DEFAULT} component={DefaultPage} />
  <Route path={URI_INNER} component={InnerPage} />
</Router>
