use crate::models::User;
use crate::services::users_service;

#[tauri::command]
pub fn get_users() -> Vec<User> {
    users_service::get_users()
}

#[tauri::command]
pub fn get_user_by_id(id: String) -> User {
    users_service::get_user_by_id(id)
}

#[tauri::command]
pub fn create_user(name: String, email: String) -> User {
    users_service::create_user(name, email)
}

#[tauri::command]
pub fn delete_user(id: String) -> User {
    users_service::delete_user(id)
}