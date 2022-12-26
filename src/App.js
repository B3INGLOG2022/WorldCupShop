
import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import {getTheme} from './themes/default.js'
import Commerce from '@chec/commerce.js';

import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from './Pages/Home';
import { SignUp } from './Pages/SignUp/SignUp';
import { SignIn } from './Pages/SignIn/SignIn';
import { ProductsPage } from './Pages/ProductsPage';
import { DetailsProductPage } from './Pages/DetailsProduct/DetailsProductPage';
import { Settings } from './Pages/Settings';
import { FavoritesPage } from './Pages/FavoritesPage';
import { CartPage } from './Pages/CartPage';
import { ThanksPage } from './Pages/Thanks/ThanksPage';
import { ContactPage } from './Pages/ContactPage';


function App() {

  const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY, true);

  return (
    <>
    <ThemeProvider theme={getTheme()}>
      <BrowserRouter>
        <ToastContainer />
        <Container maxWidth = {false}>
          <Container maxWidth = "lg">
            <Routes>
              <Route path="/" element={<Home commerce={commerce}/>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/Products" element={<ProductsPage commerce={commerce}/>} />
              <Route path="/Products/:id" element={<DetailsProductPage commerce={commerce}/>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/favorites" element={<FavoritesPage commerce={commerce}/>} />
              <Route path="/Cart" element={<CartPage commerce={commerce}/>} />
              <Route path="/Thanks" element={<ThanksPage commerce={commerce}/>} />
              <Route path="/contactUs" element={<ContactPage commerce={commerce}/>} />
            </Routes>
          </Container>
        </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
