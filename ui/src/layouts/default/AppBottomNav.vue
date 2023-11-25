<template>
    <v-bottom-navigation>
        <v-container class="h-100 w-100 pa-0 d-flex">
            <v-container
                class="pa-0 ma-0 d-flex justify-center align-center mr-auto ml-0"
                style="width: 15rem"
            >
                <v-img :src="song.image" height="50" width="50"></v-img>
                <v-container class="ml-2">
                    <p class="one-line">{{ song.title }}</p>
                    <p class="one-line">{{ song.artist }}</p>
                </v-container>
            </v-container>
            <v-container
                class="pa-0 ma-0 justify-center align-center d-flex flex-column ml-auto mr-13"
                style="width: 100rem"
            >
                <v-container
                    class="pa-0 ma-0 d-flex justify-center align-center mr-auto ml-0 w-100"
                    style="width: 15rem"
                >
                    <v-icon class="pa-4">mdi-skip-previous-circle</v-icon>
                    <v-icon @click="playControl" class="pa-4">{{
                        playing ? 'mdi-pause-circle' : 'mdi-play-circle'
                    }}</v-icon>
                    <v-icon class="pa-4">mdi-skip-next-circle</v-icon>
                </v-container>
                <v-progress-linear
                    v-model="currentSongProgress"
                    height="5"
                    color="primary"
                    background-color="#1db954"
                ></v-progress-linear>
            </v-container>
            <v-container
                class="pa-0 ma-0 justify-center align-center d-flex ml-auto mr-0"
                style="width: 15rem"
            >
                <v-icon @click="mute" class="pa-4">{{ icon }}</v-icon>
                <v-slider class="mt-5" v-model="volume"></v-slider>
            </v-container>
        </v-container>
    </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ISong, NO_SONG } from '@common/song';

enum VolumeIcon {
    HIGH = 'mdi-volume-high',
    MEDIUM = 'mdi-volume-medium',
    LOW = 'mdi-volume-low',
    OFF = 'mdi-volume-off'
}

export default defineComponent({
    name: 'AppBottomNav',
    data() {
        const volume: number = 100;
        const muted: boolean = false;
        const mutedVolume: number = 0;
        const icon: string = VolumeIcon.HIGH;
        const playing: boolean = false;
        const song: ISong = NO_SONG;
        const currentSongProgress: number = 30;

        return {
            volume,
            muted,
            mutedVolume,
            icon,
            playing,
            song,
            currentSongProgress
        };
    },
    methods: {
        mute() {
            this.muted = !this.muted;
        },
        playControl() {
            this.playing = !this.playing;
        }
    },
    watch: {
        volume() {
            if (this.volume === 0) {
                this.muted = true;
                this.icon = VolumeIcon.OFF;
            } else if (this.volume < 33) {
                this.muted = false;
                this.icon = VolumeIcon.LOW;
            } else if (this.volume < 66) {
                this.muted = false;
                this.icon = VolumeIcon.MEDIUM;
            } else {
                this.muted = false;
                this.icon = VolumeIcon.HIGH;
            }
        },
        muted() {
            if (this.muted) {
                this.mutedVolume = this.volume;
                this.volume = 0;
            } else {
                this.volume = this.mutedVolume;

                if (this.mutedVolume === 0) {
                    this.volume = 100;
                }
            }
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