use axum::{
    routing::{get, post},
    http::StatusCode,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use mongodb::{ 
    bson::{Document, doc},
    Client,
    Collection 
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {

    let app: Router = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root));
    // `POST /users` goes to `create_user`
    // .route("/users", post(create_user));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();

    // Replace the placeholder with your Atlas connection string
    let uri;  
    match std::env::var("CORIOLISDB") {
        Ok(val) => uri = val,
        Err(e) => {
            println!("Env var not found: {e}");
            std::process::exit(404);
        },
    }

    // Create a new client and connect to the server
    let client = Client::with_uri_str(uri).await?;

    // Get a handle on the movies collection
    let database = client.database("redapp");
    let my_coll: Collection<Document> = database.collection("starchild");

    // Find a movie based on the title value
    let my_movie = my_coll.find_one(doc! { "handle": "N0rt0n" }, None).await?;

    // Print the document
    println!("Found N0rt0n:\n{:#?}", my_movie);
    Ok(())
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}


