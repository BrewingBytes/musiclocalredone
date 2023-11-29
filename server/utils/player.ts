import { ISong, ISongPlaying } from '../../common/song';
import ytdl = require('ytdl-core');
import fs = require('fs');
import ffmpeg from 'fluent-ffmpeg';
import { addHistory, addQueue, getHistory } from './queue';
import { Server } from 'socket.io';

let currentSong: ISong | null = null;
const currentSongInfo: {
    duration: number;
    progress: number;
} = {
    duration: 0,
    progress: 0
};

let volume = 100;

let directory = './dist/';

export const isPlaying = () => {
    return currentSong !== null;
};

export const playSong = async (song: ISong) => {
    currentSong = song;
    currentSongInfo.duration = 0;
    currentSongInfo.progress = 0;

    if (process.env.NODE_ENV === 'production') {
        directory = './';
    }

    console.log(
        'Playing song: ' + currentSong.title + ' - ' + currentSong.artist
    );

    ytdl(currentSong.url, { filter: (format) => format.hasVideo === false })
        .pipe(fs.createWriteStream(directory + 'song.mp4'))
        .on('finish', () => {
            console.log(`Downloaded song`);

            ffmpeg(directory + 'song.mp4').ffprobe((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    currentSongInfo.duration = data.format.duration
                        ? data.format.duration
                        : 0;
                }
            });

            if (fs.existsSync(directory + 'song.mp3'))
                fs.unlinkSync(directory + 'song.mp3');

            ffmpeg(directory + 'song.mp4')
                .format('mp3')
                .save(directory + 'song.mp3')
                .on('end', () => {
                    console.log('Converted song');

                    fs.writeFileSync(directory + 'play', '');

                    const interval = setInterval(() => {
                        if (playerIsPlaying()) currentSongInfo.progress += 1;

                        if (fs.existsSync(directory + 'finished')) {
                            clearInterval(interval);

                            console.log('Finished song');

                            if (currentSong) addHistory(currentSong);

                            currentSong = null;
                        }
                    }, 1000);
                });
        });
};

export const getCurrentSong = () => {
    return { currentSong, currentSongInfo, volume };
};

export const setVolume = (newVolume: number) => {
    volume = newVolume;

    if (fs.existsSync(directory + 'volume')) {
        fs.unlinkSync(directory + 'volume');
    }

    fs.writeFileSync(directory + 'volume', `${newVolume / 100}`);
};

export const stopSong = () => {
    fs.writeFileSync(directory + 'stop', '');
};

export const pauseSong = () => {
    fs.writeFileSync(directory + 'pause', '');
};

export const resumeSong = () => {
    fs.unlinkSync(directory + 'pause');
};

export const playerIsPlaying = () => {
    if (fs.existsSync(directory + 'pause')) return false;
    if (fs.existsSync(directory + 'finished')) return false;

    return true;
};

export const backSong = () => {
    if (isPlaying()) {
        if (currentSong) addQueue(currentSong);

        stopSong();
    }

    console.log(getHistory());

    const lastSong = getHistory().pop();
    if (!lastSong) return;

    playSong(lastSong);
};

export const updatePlayingData = (socket: Server) => {
    setInterval(
        (socket: Server) => {
            let songPlaying: ISongPlaying;

            if (currentSong === null) {
                songPlaying = {
                    isPlaying: false,
                    title: '',
                    artist: '',
                    image: '',
                    url: '',
                    id: 0,
                    duration: 100,
                    currentTime: 0,
                    volume,
                    addedBy: ''
                };
            } else {
                songPlaying = {
                    isPlaying: playerIsPlaying(),
                    title: currentSong.title,
                    artist: currentSong.artist,
                    image: currentSong.image,
                    url: currentSong.url,
                    id: currentSong.id,
                    duration: currentSongInfo.duration,
                    currentTime: currentSongInfo.progress,
                    volume,
                    addedBy: currentSong.addedBy
                };
            }

            socket.emit('updatePlayingData', songPlaying);
        },
        1000,
        socket
    );
};
