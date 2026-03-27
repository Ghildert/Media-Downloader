const { invoke } = window.__TAURI__.core;

const button = document.querySelector("#download");
const output = document.querySelector("#console");
const inputUrl = document.querySelector("#url");
const selectedAudio = document.querySelector("#audio-format");
const selectedVideo = document.querySelector("#video-format");

button.addEventListener("click", async () => {
  let audio = selectedAudio.value;
  let video = selectedVideo.value;

  if (audio.includes("format")) audio = "native";
  if (video.includes("format")) video = "native";

  try {
    output.textContent = "Starting download...";
    
    const result = await invoke('download', { 
        url: inputUrl.value,
        audioFormat: audio,
        videoFormat: video
    });
    
    console.log(result);
    output.textContent = "Download Complete!";
  } catch (error) {
    console.error("Rust Error:", error);
    output.textContent = `Error: ${error}`;
  }
});