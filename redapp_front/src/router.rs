use yew::prelude::*;
use yew_router::prelude::*;
use crate::components::pages::admin::Admin;

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    Home,
    #[at("/admin")]
    Admin,
    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(route: Route) -> Html {
    return match route {
        Route::Home => html! { <h1>{ "Home" }</h1> },
        Route::Admin => html! { <Admin /> },
        Route::NotFound => html! { <h1>{ "404" }</h1> },
    }
}
