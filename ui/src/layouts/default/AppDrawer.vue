<template>
    <v-navigation-drawer>
        <v-col align="center" class="mt-2 pa-0 h-100 d-flex flex-column">
            <v-list-item
                title="Music.Local"
                subtitle="v0.0.1"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item class="d-flex justify-center" to="/home">
                <v-icon start>mdi-home</v-icon>
                <p>Home</p>
            </v-list-item>
            <v-list-item class="d-flex justify-center" to="/search">
                <v-icon start>mdi-magnify</v-icon>
                <p>Search</p>
            </v-list-item>
            <v-divider style="margin-top: auto"></v-divider>
            <v-list-item>
                <v-select
                    label="Bluetooth"
                    :items="bluetoothDevices"
                    v-model="currentDevice"
                ></v-select>
            </v-list-item>
            <v-list-item subtitle="BrewingBytes - 2023"></v-list-item>
        </v-col>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppDrawer',
    data() {
        return {
            bluetoothDevices: ['Device 1', 'Device 2', 'Device 3'],
            currentDevice: 'Device 1'
        };
    },
    mounted() {
        if (this.$route.path === '/') {
            this.$router.push('/home');
        }
    }
});
</script>

<style scoped>
.one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
