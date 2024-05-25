use super::char::Char;


pub fn all_chars() -> Vec<Char> {

    return vec![serde_json::from_str("{}").unwrap_or(Char::empty())]
}

