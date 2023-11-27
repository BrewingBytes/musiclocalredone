use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, Sink};

#[tokio::main(flavor = "multi_thread", worker_threads = 2)]
async fn main() {
    let (_stream, stream_handle) = OutputStream::try_default().unwrap();
    let sink = Sink::try_new(&stream_handle).unwrap();

    loop {
        std::thread::sleep(std::time::Duration::from_secs(1));

        // Check if file pause is existing
        if std::path::Path::new("pause").exists() {
            sink.pause();
        } else {
            sink.play();
        }

        // Check if file stop is existing
        if std::path::Path::new("stop").exists() {
            sink.stop();

            // Create a new file and remove the stop file
            File::create("finished").unwrap();
            std::fs::remove_file("stop").unwrap();
        }

        // Check volume file
        if std::path::Path::new("volume").exists() {
            let volume = std::fs::read_to_string("volume").unwrap().parse::<f32>().unwrap();
            sink.set_volume(volume);

            std::fs::remove_file("volume").unwrap();
        }

        if sink.len() == 0 {
            File::create("finished").unwrap();

            if std::path::Path::new("play").exists() {
                let file = BufReader::new(File::open("song.mp3").unwrap());
                let source = Decoder::new(file).unwrap();
    
                std::fs::remove_file("play").unwrap();
                std::fs::remove_file("finished").unwrap();

                sink.append(source);
            }
        }
    }
}