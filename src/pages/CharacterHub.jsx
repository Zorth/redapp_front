import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function CharacterHub() {

    const [characters, setCharacters] = useState();

    const fetchChar = async (processing) => {
        const url = 'http://192.168.1.100:4000/characters';
        axios.get(url).then((response) => {
            setCharacters(response.data);
        }).catch(e => console.log(e))

    }


    useEffect(() => {
            let processing = true;
            fetchChar(processing);
            return () => {
                processing = false;
            }
        },
        []);


    return (
        <div className="App">
            {characters ? characters.map((char) => {
                return <div key={char._id} >
                    <button key={char._id} className="button-49"><Link key={char._id} to={"/char/" + char._id}>{char.handle}</Link>
                    </button>
                </div>
            }) : "character fetch failed"}
            <br/>
            <Link to="/Char/New" className="button-49">New</Link>
        </div>
    )
}