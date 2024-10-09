import styled from "styled-components"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Header } from "./components/header";

export function Homepage() {
  const navigate = useNavigate();



  return (
   <HomepageStyle>
        <Header />
   </HomepageStyle>
  )
}

const HomepageStyle = styled.div`
background-color: rgba(var(--dashboard-bg), 1);
display: grid;
grid-template-columns: 17.5rem 1fr;
grid-template-rows: 3.75rem 1fr;
height: 100%;
width: 100%;
`