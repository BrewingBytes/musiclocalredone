/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp, watch } from 'vue';

import './socket';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('store', JSON.stringify(state.app));
    },
    { deep: true }
);

app.use(pinia);

registerPlugins(app);

app.mount('#app');
