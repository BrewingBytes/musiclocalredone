<template>
    <v-navigation-drawer>
        <v-col
            align="end"
            class="mt-2 pa-0 h-100 d-flex"
            style="flex-direction: column"
        >
            <v-list-item
                title="Music.Local"
                subtitle="The music is here"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Home" to="/home"></v-list-item>
            <v-list-item title="Search" to="/search"></v-list-item>
            <v-divider style="margin-top: auto"></v-divider>
            <v-list-item>
                <v-select
                    label="Bluetooth"
                    :items="bluetoothDevices"
                    v-model="currentDevice"
                ></v-select>
            </v-list-item>
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
