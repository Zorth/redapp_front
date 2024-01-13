import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className="App">
            <h1>Welcome to REDAPP</h1>
            <Link to="/CharacterHub" className="button-item">
                <button className="button-49">CharacterHub</button>
            </Link>
        </div>
    )
}