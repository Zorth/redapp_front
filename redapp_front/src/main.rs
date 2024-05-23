mod app;
mod cookies;

use app::App;

fn main() {
    yew::Renderer::<App>::new().render();
}
