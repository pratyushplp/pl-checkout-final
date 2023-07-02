import { useState } from 'react'
import './App.css'
import { BrowserRouter,HashRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage"
import Layout from './pages/layout/Layout';
import Chat from './pages/chat/Chat';



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {< Layout/>}>
      <Route index element={<Chat/>} />
      <Route path='*' element = {<NoPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )

}

