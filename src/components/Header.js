import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header({setQuery}) {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    function handleSearch(){
        if(!(input.trim())) return;
        navigate(`/search/${input}`);
    }

    function handleInput(e){
        if(e.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <div className='header'>
            <h1>Image Bazzer</h1>
            <div className="search-bar">
                <input type="search" className='search-inp' placeholder='Type to search...' value={input} onKeyUp={handleInput} onChange={(e) => setInput(e.target.value)}/>
                <button onClick={handleSearch} className="search-btn">Search</button>
            </div>
        </div>
    )
}

export default Header