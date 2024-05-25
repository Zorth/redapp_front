pub mod app;
pub mod cookies;
pub mod components;
pub mod router;

use app::App;

fn main() {
    yew::Renderer::<App>::new().render();
}
