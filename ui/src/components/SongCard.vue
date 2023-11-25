<template>
    <v-container
        class="ma-5 mb-0 mt-0 d-flex flex-row"
        style="border: 1px solid black; border-left: 0; border-right: 0"
    >
        <v-img :src="song.image" height="5rem" width="5rem"></v-img>
        <v-col cols="8" align-self="center">
            <p class="text-h5 font-weight-bold">{{ song.title }}</p>
            <p class="text-subtitle-1 font-weight-light">{{ song.artist }}</p>
        </v-col>
        <v-col cols="2" align-self="center" v-if="song.duration !== 0">
            <p class="text-h5 font-weight-medium">{{ duration }}</p>
            <p v-if="song.addedBy" class="text-subtitle-1 font-weight-light">
                Added by: {{ song.addedBy }}
            </p>
        </v-col>
        <v-col cols="2" align-self="center">
            <v-icon @click="addToQueue">mdi-plus-circle</v-icon>
        </v-col>
    </v-container>
</template>

<script lang="ts">
import { ISong } from '@common/song';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SongCard',
    props: {
        song: {
            type: Object as () => ISong,
            required: true
        }
    },
    computed: {
        duration(): string {
            const minutes: number = Math.floor(this.song.duration / 60);
            const seconds: number = this.song.duration % 60;

            return `${minutes.toString().padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;
        }
    },
    methods: {
        addToQueue(): void {
            console.log('add to queue');
        }
    }
});
</script>

<style scoped>
.v-icon:hover {
    cursor: pointer;
    color: #1db954;
}
</style>
