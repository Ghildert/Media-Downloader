const { invoke } = window.__TAURI__.core;

const inputUrl = document.querySelector("#url");
const thumbnail = document.querySelector(".thumbnail img");
const metadata = document.querySelector(".metadata");

inputUrl.addEventListener("input", async (event) => {
    const url = event.target.value.trim();

    if (url.startsWith("http://") || url.startsWith("https://")) {
        try {
            metadata.innerHTML = "<p style='padding: 10px;'>Fetching metadata...</p>";
            
            const rawJson = await invoke('get_metadata', { url: url });
            const data = JSON.parse(rawJson);

            if (data.thumbnail) {
                thumbnail.src = data.thumbnail;
            }

            metadata.innerHTML = `
                <div style="display: grid; grid-template-columns: 80px 1fr; gap: 8px; padding: 10px; font-size: 14px; text-align: left;">
                    <strong>Title:</strong>
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${data.title || 'Unknown Title'}">
                        ${data.title || "N/A"}
                    </span>
                    
                    <strong>Creator:</strong> 
                    <span>${data.uploader || data.artist || "Unknown"}</span>
                    
                    <strong>Year:</strong> 
                    <span>${data.upload_date ? data.upload_date.substring(0, 4) : "Unknown"}</span>
                    
                    <strong>Views:</strong> 
                    <span>${data.view_count ? data.view_count.toLocaleString() : "N/A"}</span>
                </div>`
            ;

        } catch (error) {
            console.error("Metadata extraction failed:", error);
            metadata.innerHTML = `<p style='padding: 10px; color: red;'>Error loading metadata.</p>`;
        }
    } else if (url === "") {
        thumbnail.src = "../assets/thumbnail.png";
        metadata.innerHTML = "META DATA";
    }
});