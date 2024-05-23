#![allow(unused)] // remove this
use axum::{
    http::StatusCode, response::IntoResponse, routing::{get, post}, Json, Router
};
use serde::{Deserialize, Serialize};
use mongodb::{ 
    bson::{Document, doc},
    Client,
    Collection 
};


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
        .route("/hello", get(handler_hello()));

    // run our app with hyper, listening globally on port 3000
    let ip = "0.0.0.0:3000";
    println!("listening on {}", ip);
    let listener = tokio::net::TcpListener::bind(ip).await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}

#[derive(Debug, Deserialize)]
struct HelloParams {
    name: Option<String>,
}

async fn root() -> &'static str {
    "Connected to RedAPP backend."
}

async fn handler_hello() -> impl IntoResponse {
    println!("->> {:<12} - handler_hello", "HANDLER");

    Html("hello")
}


