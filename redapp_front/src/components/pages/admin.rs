use yew::prelude::*;

use crate::components::char::Char;

#[function_component(Admin)]
pub fn admin() -> Html {
    let mut temp_char = Char::empty();
    temp_char.handle = "TEST".to_string();
    let chars = vec![Char::empty(), temp_char];
    let selected_char = use_state(|| None);
    let on_character_select = {
        let selected_char = selected_char.clone();
        Callback::from(move |char: Char| selected_char.set(Some(char)))
    };

    return html! {
        <>
            <CharList
            chars= {chars}
            on_click= {on_character_select}
        />
            <div class="admin-InitTracker">
            { selected_char.as_ref().map(|c| {
                                         html!{
                                             <p>{c.handle.clone()}</p>
                                         }}
                                         )}
            </div>
            </>
    };
}

#[derive(Properties, PartialEq)]
struct CharListProps {
    chars: Vec<Char>,
    on_click: Callback<Char>,
}

#[function_component(CharList)]
fn char_list(CharListProps { chars, on_click }: &CharListProps) -> Html {
    return html! {
    <div class="admin-CharList">
    { chars.iter().map(|c| {
                let on_character_select = {
                    let on_click = on_click.clone();
                    let c = c.clone();
                    Callback::from(move |_| {
                        on_click.emit(c.clone())
                    })
                };

                html! {
                    <div class="admin-CharSide" onclick={on_character_select}><h2>{format!("{}", c.handle)}</h2></div>
                }
            })
        .collect::<Html>()}
    </div> };
}
