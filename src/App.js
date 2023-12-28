import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Galary from './components/Galary'

function App() {
    return (
        <BrowserRouter>
            <div className='main'>
                <Header/>
                <Routes>
                    <Route path='/' element={<Galary/>} />
                    <Route path='/search/:query' element={<Galary/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App