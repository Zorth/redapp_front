import {Link} from "react-router-dom";


export function Error() {
    return (
        <div className="App">
            <h1>Page Not Found.</h1>
            <Link to="/" className="button-item">
                <button className="button-49">Return Home</button>
            </Link>
        </div>
    )
}