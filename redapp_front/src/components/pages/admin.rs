use yew::prelude::*;

use crate::components::char::Char;

#[function_component(Admin)]
pub fn admin() -> Html {
    let chars = vec![Char::empty(), Char::empty()];

    return html! {
        <>
            <h1>{"Admin"}</h1>
            <div>{charlist(chars)}</div>
        </>
    }
}

fn charlist(chars: Vec<Char>) -> Html {
    return chars.iter().map(|c| html! {
        <h2>{format!("{}", c.handle)}</h2>
    }).collect::<Html>();
}

