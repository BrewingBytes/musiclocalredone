<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="searchQuery"
                    label="Search"
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-container
            class="d-flex flex-column"
            style="justify-content: center; align-items: center"
        >
            <SongCard
                v-for="song in songList"
                :song="song"
                v-bind:key="song.url"
            />
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ISong, NO_SONG } from '@common/song';
import SongCard from '@/components/SongCard.vue';

export default defineComponent({
    name: 'Search',
    components: {
        SongCard
    },
    data() {
        const searchQuery: string = '';
        const songList: ISong[] = [
            NO_SONG,
            NO_SONG,
            NO_SONG,
            NO_SONG,
            NO_SONG,
            NO_SONG
        ];

        return {
            searchQuery,
            songList
        };
    }
});
</script>
