import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import {Home} from "./pages/Home";
import {Error} from "./pages/404";
import {CharacterHub} from "./pages/CharacterHub";
import {Char} from "./pages/Char";
import {NewCharacter} from "./pages/NewCharacter";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: "/CharacterHub",
        element: <CharacterHub />,
    },
    {
        path: "/Char/New",
        element: <NewCharacter />
    },
    {
        path: "Char/:id",
        element: <Char />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
