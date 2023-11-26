import { ISong } from '../../common/song';
import { playSong, isPlaying } from './player';

const queueList: ISong[] = [];
const queueHistory: ISong[] = [];

export const addQueue = (song: ISong) => {
    song.id = queueList.length;

    queueList.push(song);
};

export const getQueue = () => {
    return queueList;
};

export const removeQueue = (index: number) => {
    queueList.splice(index, 1);
};

export const startQueue = () => {
    setInterval(() => {
        if (queueList.length > 0 && isPlaying() === false) {
            const nextSong = queueList.shift();

            if (nextSong) {
                playSong(nextSong);
            }
        }
    }, 1000);
};

export const getHistory = () => {
    return queueHistory;
};

export const addHistory = (song: ISong) => {
    queueHistory.push(song);
};
