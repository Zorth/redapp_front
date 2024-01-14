import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

export function NewCharacter() {

    const [handle, setHandle] = new useState("Handle");


    const postChar = async (processing) => {
        const newChar = {"handle": handle}

        const url = 'http://192.168.1.100:4000/characters';
        await axios.post(url, newChar)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className="App">
            <input
                placeholder="Handle"
                // value={handle}
                onChange={e => setHandle(e.target.value)}/>
            <button className="button-49" onClick={postChar}><Link to="/CharacterHub">Save Character</Link></button>
        </div>
    )
}