mod download;
mod metadata;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            download::download,
            metadata::get_metadata
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}