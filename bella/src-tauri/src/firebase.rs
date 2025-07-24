use tauri::command;
use std::fs;

#[command]
pub fn get_firebase_config() -> Result<String, String> {
    let config_str = fs::read_to_string("firebase_config.json")
        .map_err(|e| format!("Failed to read config file: {}", e))?;
    Ok(config_str)
}
