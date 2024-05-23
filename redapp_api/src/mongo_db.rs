use mongodb::{ 
    bson::{Document, doc},
    Client,
    Collection 
};

pub async fn get_starchild() -> Collection<Document> {
    // get uri from $env
    let uri;  
    match std::env::var("CORIOLISDB") {
        Ok(val) => uri = val,
        Err(e) => {
            println!("Env var not found: {e}");
            std::process::exit(404);
        },
    }

    let client = Client::with_uri_str(uri).await.unwrap();
    let database = client.database("redapp");
    let starchild_coll: Collection<Document> = database.collection("starchild");
    let user_coll: Collection<Document> = database.collection("user");

    return starchild_coll;
}
