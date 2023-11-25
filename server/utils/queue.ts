import { ISong } from '../../common/song';

const queueList: ISong[] = [];

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
