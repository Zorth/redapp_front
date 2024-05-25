use crate::{cookies::{clear_user, cokbtn, get_cookies}, router::{switch, Route}};
use yew::prelude::*;
use yew_router::prelude::*;


#[function_component(App)]
pub fn app() -> Html {
    html! {
        <BrowserRouter>
            <Switch<Route> render={switch} />
        </BrowserRouter>
    }
    // html! {
    //     <main>
    //         <h1>{ "Hello World!" }</h1>
    //         <span class="subtitle">{ "from Yew with " }<i class="heart" /></span>
    //         <span class="subtitle">{get_cookies().get("user")}</span>
    //         <button onclick={Callback::from(|_| cokbtn())}>
    //             { "test Cookie" }
    //         </button>
    //         <button onclick={Callback::from(|_| clear_user())}>
    //             { "log out" }
    //         </button>
    //     </main>
    // }
}
