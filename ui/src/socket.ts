import { reactive } from 'vue';
import { io } from 'socket.io-client';
import { API_URL } from './store/config';
import { ISongPlaying, NO_SONG } from '@common/song';

export const state = reactive({
    connected: false,
    playingData: NO_SONG as ISongPlaying
});

export const socket = io(API_URL);

socket.on('connect', () => {
    state.connected = true;
});

socket.on('disconnect', () => {
    state.connected = false;
});

socket.on('updatePlayingData', (data) => {
    state.playingData = data;
});
