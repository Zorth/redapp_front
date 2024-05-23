#![allow(unused)] // remove this
use axum::{
    extract::Query, http::StatusCode, response::IntoResponse, routing::{get, post}, Json, Router
};
use futures::TryStreamExt;
use mongo_db::get_starchild;
use serde::{Deserialize, Serialize};
use mongodb::{ 
    bson::{Document, doc},
    Client,
    Collection 
};

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
        },
    }

    let client = Client::with_uri_str(uri).await?;
    let database = client.database("redapp");
    let starchild_coll: Collection<Document> = database.collection("starchild");
    let user_coll: Collection<Document> = database.collection("user");



    // Router //
    let app: Router = Router::new()
        .route("/", get(root))
        .route("/user", get(handler_user))
        .route("/starchild/all", get(starchild_all));

    // run our app with hyper, listening globally on port 3000
    let ip = "0.0.0.0:3000";
    println!("listening on {}", ip);
    let listener = tokio::net::TcpListener::bind(ip).await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn root() -> &'static str {
    return "Connected to RedAPP backend.";
}

#[derive(Debug, Deserialize)]
struct HelloParams {
    name: Option<String>,
}

async fn handler_user(params: Query<HelloParams>) -> impl IntoResponse {
    println!("->> {:<12} - handler_user - {params:?}", "HANDLER");

    let name = params.name.as_deref().unwrap_or("default_name");
    return format!("test {name}");
}

async fn starchild_all() -> impl IntoResponse {
   return format!("{}", get_starchild().await.find(doc!{}, None).await.unwrap().try_concat().await.unwrap());
}

