function populateSelect(selectElement, label, formats) {
    const defaultOption = document.createElement("option");
    defaultOption.textContent = label;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    formats.forEach(format => {
        const option = document.createElement("option");
        option.value = format.toLowerCase();
        option.textContent = format;
        selectElement.appendChild(option);
    });
}

const audioFormats = ["NONE", "MP3", "MP4a", "WAV", "AAC"];
const videoFormats = ["NONE", "MP4", "WEBM", "MKV", "MOV", "AVI"];
// const fpsFormats = ["NATIVE", "120", "60", "30", "15"];
// const resolutionFormats = ["NATIVE", "1440", "1080", "720", "480", "360"]

populateSelect(
    document.getElementById("audio-format"),
    "Audio Format",
    audioFormats
);

populateSelect(
    document.getElementById("video-format"),
    "Video Format",
    videoFormats
);

// populateSelect(
//     document.querySelector("#resolution-format"),
//     "Resolution Fomrat",
//     resolutionFormats

// )

// populateSelect(
//     document.getElementById("fps-format"),
//     "FPS Format",
//     fpsFormats
// );