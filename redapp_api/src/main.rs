#![allow(unused)] // remove this
use axum::{
    extract::{Path, Query},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use futures::TryStreamExt;
use mongo_db::get_starchild;
use mongodb::{
    bson::{doc, Document},
    options::FindOptions,
    Client, Collection,
};
use serde::{Deserialize, Serialize};

pub mod mongo_db;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    // get uri from $env
    let uri;
    match std::env::var("CORIOLISDB") {
        Ok(val) => uri = val,
        Err(e) => {
            println!("Env var not found: {e}");
            std::process::exit(404);
        }
    }

    let client = Client::with_uri_str(uri).await?;
    let database = client.database("redapp");
    let starchild_coll: Collection<Document> = database.collection("starchild");
    let user_coll: Collection<Document> = database.collection("user");

    // Router //
    let app: Router = Router::new()
        .route("/", get(root))
        // .route("/user", get(handler_user))
        .route("/starchild/:handle", get(character_handler))
        .route("/starchild/all", get(starchild_all));

    // run our app with hyper, listening globally on port 3000
    let ip = "192.168.0.100:3000";
    println!("listening on {}", ip);
    let listener = tokio::net::TcpListener::bind(ip).await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn root() -> &'static str {
    return "Connected to RedAPP backend.";
}

// struct HelloParams {
//     name: Option<String>,
// }

// async fn handler_user(params: Query<HelloParams>) -> impl IntoResponse {
//     println!("->> {:<12} - handler_user - {params:?}", "HANDLER");

//     let name = params.name.as_deref().unwrap_or("default_name");
//     return format!("test {name}");
// }

async fn character_handler(Path(handle): Path<String>) -> impl IntoResponse {
    let coll = get_starchild().await;
    return match coll.find_one(doc! {"handle": &handle}, None).await.unwrap() {
        Some(c) => c.to_string(),
        None => format!("Handle {} not found", &handle),
    };
}

async fn starchild_all() -> impl IntoResponse {
    let opts = FindOptions::builder().build();
    let cursor = get_starchild().await.find(None, None).await.unwrap();
    let results: Vec<Document> = cursor.try_collect().await.unwrap();
    let mut total: Vec<String> = Vec::new();
    for doc in results {
        total.push(doc.to_string());
    }
    return format!("[{}]", total.join(","));
}
