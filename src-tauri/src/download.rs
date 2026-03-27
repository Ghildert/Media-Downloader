use tauri::{AppHandle, Manager};
use tauri_plugin_shell::ShellExt;

#[tauri::command]
pub async fn download(
    app: AppHandle,
    url: String,
    audio_format: String,
    video_format: String
) -> Result<String, String> {
    let sidecar_command = app
        .shell()
        .sidecar("yt-dlp")
        .map_err(|e| format!("Failed to create sidecar: {}", e))?;

    let var_audio: bool = audio_format.to_uppercase() != "NONE";
    let var_video: bool = video_format.to_uppercase() != "NONE";
    let mut args: Vec<String> = vec![];

    let audio_directory: String = app.path().audio_dir()
        .unwrap_or_else(|_| std::path::PathBuf::from("."))
        .to_string_lossy()
        .into_owned();

    let video_directory: String = app.path().video_dir()
        .unwrap_or_else(|_| std::path::PathBuf::from("."))
        .to_string_lossy()
        .into_owned();

    args.push("-P".to_string());

    if var_audio && !var_video {
        // AUDIO ONLY
        args.push(audio_directory);
        args.push("-f".to_string());
        args.push("bestaudio".to_string());
        args.push("-x".to_string());
        args.push("--audio-format".to_string());
        args.push(audio_format);
        args.push("--no-playlist".to_string());
        args.push("--embed-thumbnail".to_string());
        args.push("--embed-metadata".to_string());
        args.push("-o".to_string());
        args.push("%(title)s.%(ext)s".to_string());

    } else if var_video {
        args.push(video_directory);
        args.push("-f".to_string());
        args.push("bestvideo+bestaudio/best".to_string());
        
        if video_format.to_uppercase() != "NONE" {
            args.push("--merge-output-format".to_string());
            args.push(video_format);
        }
    }

    args.push(url);

    let output = sidecar_command
        .args(args)
        .output()
        .await
        .map_err(|e| format!("Failed to execute yt-dlp: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}