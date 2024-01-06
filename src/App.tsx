import React from 'react';
import {Home} from './pages/Home';
import {Character} from "./pages/Character";
import {SpellGenerator} from "./pages/SpellGenerator";
import {HashRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
    return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Character" element={<Character/>}/>
                    <Route path="/SpellGenerator" element={<SpellGenerator/>}/>
                </Routes>
            </HashRouter>
    );
}

export default App;
