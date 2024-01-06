import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className="App">
            <h1>Welcome to REDAPP</h1>
            <Link to="/Character" className="button-item">
                <button className="button-49">Character</button>
            </Link>
            <Link to="/SpellGenerator" className="button-item">
                <button className="button-49">SpellGenerator</button>
            </Link>
        </div>
    )
}