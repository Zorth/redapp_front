use std::collections::HashMap;
use wasm_cookies::CookieOptions;
// use web_sys::console::log_1;

pub fn get_cookies() -> HashMap<String, String> {
    match wasm_cookies::all() {
        Ok(c) => return c,
        Err(_) => return HashMap::new(),
    }
}

pub fn cokbtn() {
    // cookies set to expire after 24hrs
    let opt = CookieOptions::default();
    wasm_cookies::set_raw("user", "test", &opt);
    // log_1(&JsValue::from_str("test"));
}

pub fn clear_user() {
    // cookies set to expire after 24hrs
    wasm_cookies::delete("user");
    // log_1(&JsValue::from_str("test"));
}

