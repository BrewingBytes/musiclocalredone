use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, source::Source};
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 1 {
        println!("Please provide a duration");
        return;
    }

    println!("Playing for {} seconds", args[1]);

    let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    let file = BufReader::new(File::open("song.mp3").unwrap());
    let source = Decoder::new(file).unwrap();
    stream_handle.play_raw(source.convert_samples()).unwrap();

    std::thread::sleep(std::time::Duration::from_secs(args[1].parse::<u64>().unwrap()));
}