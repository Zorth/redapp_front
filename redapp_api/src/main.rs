use mongodb::{ 
	bson::{Document, doc},
	Client,
	Collection 
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
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
    let database = client.database("sample_mflix");
    let my_coll: Collection<Document> = database.collection("movies");

    // Find a movie based on the title value
    let my_movie = my_coll.find_one(doc! { "title": "The Perils of Pauline" }, None).await?;

    // Print the document
    println!("Found a movie:\n{:#?}", my_movie);
    Ok(())
}

