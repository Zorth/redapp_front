"use client";

import { getChar } from '../../api/CharacterFuncs';

export default async function CharPage({params}) {
    const char = await getChar(params.character);

    return (
        <div>
            <h1>{String(char.handle)}</h1>
        </div>
    );
}