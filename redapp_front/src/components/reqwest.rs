use super::char::Char;


pub async fn all_chars() -> Vec<Char> {

    let client = reqwest::Client::new();
    let res = client.get("192.168.0.100:3000").send().await.unwrap().text().await.unwrap();
    return vec![serde_json::from_str(&res).unwrap_or(Char::empty())]
}

