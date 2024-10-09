import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import "./styles/globals.css"
import "./styles/variables.css"
import toast, { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position='bottom-right'/>
    <RouterProvider router={router} />
  </>
)