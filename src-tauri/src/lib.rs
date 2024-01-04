pub mod db;
pub mod models;
pub mod schema;
pub mod services;
pub mod commands;

use commands::user_commands::*;
use commands::greet_commands::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let _ = fix_path_env::fix();

    tauri::Builder::default()
    .setup(|_app | {
        db::init();
        Ok(())
    })
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_users,
            get_user_by_id,
            create_user,
            delete_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
