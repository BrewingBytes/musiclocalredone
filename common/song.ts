interface ISong {
    image: string;
    duration: number;
    title: string;
    artist: string;
    url: string;
}

const NO_SONG: ISong = {
    image: 'https://lh3.googleusercontent.com/q5PWa2JVJApX31A7QU2vE4RY8i5S_ofYbfpxgDjhz5fagMAxv8ROkEpUr2OAYgYrhzYqJpv0bV94DRCb=w120-h120-l90-rj',
    duration: 187,
    title: 'Radioactive',
    artist: 'Imagine Dragons',
    url: 'https://music.youtube.com/watch?v=R_BO8C05XLA'
}

export { ISong, NO_SONG };
