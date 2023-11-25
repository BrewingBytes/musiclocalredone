<template>
    <v-app>
        <default-drawer />
        <default-bottom-nav />
        <default-view />
    </v-app>
</template>

<script lang="ts" setup>
import DefaultDrawer from './AppDrawer.vue';
import DefaultBottomNav from './AppBottomNav.vue';
import DefaultView from './View.vue';
</script>
