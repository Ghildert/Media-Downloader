use tauri::{AppHandle};
use tauri_plugin_shell::ShellExt;

#[tauri::command]
pub async fn get_metadata(app: AppHandle, url: String) -> Result<String, String> {
    let sidecar_command = app
        .shell()
        .sidecar("yt-dlp")
        .map_err(|e| format!("Failed to create sidecar: {}", e))?;

    let output = sidecar_command
        .args(["--dump-json", "--no-playlist", &url])
        .output()
        .await
        .map_err(|e| format!("Failed to fetch metadata: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}