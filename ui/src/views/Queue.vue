<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Current Queue</h1>
            </v-col>
        </v-row>
        <v-container
            class="d-flex flex-column"
            style="justify-content: center; align-items: center"
            v-if="songList.length !== 0"
        >
            <SongCard
                v-for="song in songList"
                :song="song"
                v-bind:key="song.url"
            />
        </v-container>
        <v-container
            class="d-flex flex-column"
            style="justify-content: center; align-items: center"
            v-else
        >
            <h2>Queue is empty</h2>
            <h5>It's your time to be a DJ!</h5>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { state } from '@/socket';
import { defineComponent } from 'vue';
import { ISong } from '@common/song';

import SongCard from '@/components/SongCard.vue';

export default defineComponent({
    name: 'Queue',
    components: {
        SongCard
    },
    data() {
        const songList: ISong[] = [];

        return {
            songList
        };
    },
    mounted() {
        this.fetchData();

        setInterval(() => {
            this.fetchData();
        }, 200);
    },
    methods: {
        async fetchData() {
            this.songList = state.queue;

            this.$forceUpdate();
        }
    }
});
</script>
