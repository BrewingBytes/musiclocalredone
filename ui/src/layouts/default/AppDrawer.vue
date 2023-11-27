<template>
    <v-navigation-drawer>
        <v-col align="center" class="mt-2 pa-0 h-100 d-flex flex-column">
            <v-list-item title="Music.Local" :subtitle="version"></v-list-item>
            <v-divider></v-divider>
            <v-list-item class="d-flex justify-center" to="/queue">
                <v-icon start>mdi-music-box</v-icon>
                <p>Queue</p>
            </v-list-item>
            <v-list-item class="d-flex justify-center" to="/search">
                <v-icon start>mdi-magnify</v-icon>
                <p>Search</p>
            </v-list-item>
            <v-divider class="mb-2" style="margin-top: auto"></v-divider>
            <v-list-item>
                <v-text-field
                    label="Username"
                    outlined
                    v-model="username"
                ></v-text-field>
            </v-list-item>
            <v-list-item>
                <v-select
                    label="Audio Device"
                    :items="bluetoothDevices"
                    v-model="currentDevice"
                ></v-select>
            </v-list-item>
        </v-col>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { VERSION } from '@/store/config';
import { defineComponent } from 'vue';
import { generateUsername } from 'unique-username-generator';

export default defineComponent({
    name: 'AppDrawer',
    data() {
        const username: string = '';
        const bluetoothDevices: string[] = ['Primary Device'];
        const currentDevice: string = 'Primary Device';

        return {
            bluetoothDevices,
            currentDevice,
            username,
            version: VERSION
        };
    },
    mounted() {
        if (this.username === '') {
            this.username = generateUsername();
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
