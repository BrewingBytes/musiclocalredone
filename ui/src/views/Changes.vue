<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Changes</h1>
            </v-col>
        </v-row>
        <v-container
            class="d-flex flex-column"
            style="justify-content: center; align-items: center"
        >
            <v-card
                v-for="change in changes"
                :key="change.version"
                class="mt-5 pa-5"
                style="width: 50rem"
            >
                <v-card-title>
                    <h2>{{ change.version }}</h2>
                </v-card-title>
                <v-card-text>
                    <ul>
                        <li
                            v-for="description in change.descriptions"
                            v-bind:key="description"
                        >
                            {{ description }}
                        </li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Changes',
    data() {
        return {
            changes: [
                {
                    version: '0.1.4',
                    descriptions: [
                        'Switch to Sockets for queue information',
                        'Added Username',
                        'Added Changes Page'
                    ]
                },
                {
                    version: '0.1.3',
                    descriptions: [
                        'Switch to Sockets for current song information',
                        'Modify Volume Control to use the internal Rust Player Volume not System Volume'
                    ]
                },
                {
                    version: '0.1.2',
                    descriptions: [
                        'Added Auto-Update',
                        'Modified Player to always run in background'
                    ]
                },
                {
                    version: '0.1.1',
                    descriptions: ['Add Controls to Player']
                },
                {
                    version: '0.1.0',
                    descriptions: [
                        'Add Rust Audio Player',
                        'Create a history for songs'
                    ]
                },
                {
                    version: '0.0.9',
                    descriptions: ['Add Volume control']
                },
                {
                    version: '0.0.8',
                    descriptions: ['Add NodeJS Song Player']
                },
                {
                    version: '0.0.7',
                    descriptions: ['Add Queue Page']
                },
                {
                    version: '0.0.6',
                    descriptions: ['Add Search Page']
                },
                {
                    version: '0.0.5',
                    descriptions: ['Add Drawer']
                },
                {
                    version: '0.0.4',
                    descriptions: ['Add Bottom Player']
                },
                {
                    version: '0.0.3',
                    descriptions: ['Add Store']
                },
                {
                    version: '0.0.2',
                    descriptions: ['Add Vue Router']
                },
                {
                    version: '0.0.1',
                    descriptions: ['Create initial Vue App and Express']
                }
            ]
        };
    }
});
</script>
