<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="searchQuery"
                    label="Search"
                    outlined
                    @keyup.enter="search"
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
import { API_URL } from '@/store/config';
import axios from 'axios';
import { defineComponent } from 'vue';
import { ISong } from '@common/song';
import SongCard from '@/components/SongCard.vue';

interface ISongSearch {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        channelId: string;
        channelTitle: string;
        title: string;
        description: string;
        liveBroadcastContent: string;
        publishTime: string;
        publishedAt: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
}

export default defineComponent({
    name: 'Search',
    components: {
        SongCard
    },
    data() {
        const searchQuery: string = '';
        const songList: ISong[] = [];

        return {
            searchQuery,
            songList
        };
    },
    methods: {
        async search() {
            const data = await axios.post(API_URL + '/search/query', {
                query: this.searchQuery
            });

            const returnedSongs = data.data.payload;

            this.songList = [];
            returnedSongs.forEach((song: ISongSearch) => {
                this.songList.push({
                    title: song.snippet.title,
                    url: 'https://youtube.com/watch?v=' + song.id.videoId,
                    image: song.snippet.thumbnails.default.url,
                    duration: 0,
                    artist: song.snippet.channelTitle
                });
            });
        }
    }
});
</script>
