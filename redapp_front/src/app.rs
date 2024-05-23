use yew::prelude::*;
use crate::cookies::{clear_user, cokbtn, get_cookies};

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <main>
            <h1>{ "Hello World!" }</h1>
            <span class="subtitle">{ "from Yew with " }<i class="heart" /></span>
            <span class="subtitle">{get_cookies().get("user")}</span>
            <button onclick={Callback::from(|_| cokbtn())}>
                { "test Cookie" }
            </button>
            <button onclick={Callback::from(|_| clear_user())}>
                { "log out" }
            </button>
        </main>
    }
}

