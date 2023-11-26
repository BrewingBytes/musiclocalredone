import { ISong } from '../../common/song';
import ytdl = require('ytdl-core');
import fs = require('fs');
import ffmpeg from 'fluent-ffmpeg';
import loudness from 'loudness';
import { addHistory } from './queue';
import { exec, ChildProcess } from 'child_process';

let currentSong: ISong | null = null;
const currentSongInfo: {
    duration: number;
    progress: number;
} = {
    duration: 0,
    progress: 0
};

let volume = 100;

let playerUrl: string = './dist/rust-player';
let rustPlayer: ChildProcess;

export const isPlaying = () => {
    return currentSong !== null;
};

export const playSong = async (song: ISong) => {
    currentSong = song;
    currentSongInfo.duration = 0;
    currentSongInfo.progress = 0;

    console.log(
        'Playing song: ' + currentSong.title + ' - ' + currentSong.artist
    );
    ytdl(currentSong.url, { filter: (format) => format.hasVideo === false })
        .pipe(fs.createWriteStream('song.mp4'))
        .on('finish', () => {
            console.log(`Downloaded song`);

            ffmpeg('song.mp4').ffprobe((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    currentSongInfo.duration = data.format.duration
                        ? data.format.duration
                        : 0;
                }
            });

            if (fs.existsSync('song.mp3')) fs.unlinkSync('song.mp3');

            if (process.env.NODE_ENV === 'production') {
                playerUrl = './rust-player';
            }

            ffmpeg('song.mp4')
                .format('mp3')
                .save('song.mp3')
                .on('end', () => {
                    console.log('Converted song');

                    rustPlayer = exec(
                        playerUrl + ' ' + Math.ceil(currentSongInfo.duration)
                    );
                    rustPlayer.on('exit', () => {
                        console.log('Finished song');

                        if (currentSong) addHistory(currentSong);

                        currentSong = null;
                    });

                    setInterval(() => {
                        currentSongInfo.progress += 1;
                    }, 1000);
                });
        });
};

export const getCurrentSong = () => {
    return { currentSong, currentSongInfo, volume };
};

export const setVolume = (newVolume: number) => {
    volume = newVolume;

    loudness.setVolume(volume);
};

export const stopSong = () => {
    if (rustPlayer) rustPlayer.kill();
};
