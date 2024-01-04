use crate::models::NewUser;
use crate::schema::users;
use crate::schema::users::dsl;
use crate::{db::establish_db_connection, models::User};
extern crate uuid;
use diesel::prelude::*;

pub fn get_users() -> Vec<User> {
    let mut connection = establish_db_connection();
    dsl::users.load::<User>(&mut connection).expect("Error loading users")
}

pub fn get_user_by_id(id: String) -> User {
    let mut connection = establish_db_connection();    dsl::users
        .find(id)
        .first::<User>(&mut connection)
        .expect("Error loading user")
}

pub fn create_user(name: String, email: String) -> User {
    let mut connection = establish_db_connection();
    
    let user_id = uuid::Uuid::new_v4().to_string();
    let new_user = NewUser {
        id: user_id.clone(),
        name,
        email,
        created_at: chrono::Local::now().naive_local(),
        updated_at: chrono::Local::now().naive_local(),
    };

    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&mut connection)
        .expect("Error saving new user");

    dsl::users
        .find(user_id)
        .first::<User>(&mut connection)
        .expect("Error loading user")
}

pub fn delete_user(id: String) -> User {
    let mut connection = establish_db_connection();
    let user = dsl::users
        .find(id.clone())
        .first::<User>(&mut connection)
        .expect("Error loading user");

    diesel::delete(dsl::users.find(id))
        .execute(&mut connection)
        .expect("Error deleting user");

    user
}