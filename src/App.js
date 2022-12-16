
import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import {getTheme} from './themes/default.js'
import Commerce from '@chec/commerce.js';

import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/molecules/navBar/NavBar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from './Pages/Home';
import { SignUp } from './Pages/SignUp';
import { SignIn } from './Pages/SignIn';
import { ProductsPage } from './Pages/ProductsPage';
import { DetailsProductPage } from './Pages/DetailsProductPage';
import { Settings } from './Pages/Settings';
import { FavoritesPages } from './Pages/FavoritesPage';
import { CommandPage } from './Pages/CommandPage';


function App() {

  const commerce = new Commerce('pk_test_49104637cd5730bad2a0d52cc7f38c2ed5927e9f0368e', true);

  return (
    <>
    <ThemeProvider theme={getTheme()}>
      <BrowserRouter>
        <ToastContainer />
        <Container maxWidth = "md">
          <NavBar />
          <Container maxWidth = "sm">
            <Routes>
              <Route path="/" element={<Home commerce={commerce}/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/Products" element={<ProductsPage commerce={commerce}/>} />
              <Route path="/Products/:id" element={<DetailsProductPage commerce={commerce}/>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/favorites" element={<FavoritesPages commerce={commerce}/>} />
              <Route path="/Cart" element={<CommandPage commerce={commerce}/>} />
            </Routes>
          </Container>
        </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
