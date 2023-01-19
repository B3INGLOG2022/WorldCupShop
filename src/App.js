
import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import {getTheme} from './themes/default.js'
import Commerce from '@chec/commerce.js';

import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignUp } from './Pages/SignUp/SignUp';
import { SignIn } from './Pages/SignIn/SignIn';
import { ProductsPage } from './Pages/ProductsList/ProductsPage';
import { DetailsProductPage } from './Pages/DetailsProduct/DetailsProductPage';
import { CartPage } from './Pages/Cart/CartPage';
import { ThanksPage } from './Pages/Thanks/ThanksPage';
import { ContactPage } from './Pages/ContactUs/ContactPage';
import { ErrorPage } from './Pages/Error/ErrorPage';
import { Provider } from 'react-redux';
import { store } from './store/index'
function App() {

  const commerce = new Commerce(process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY, true);

  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme()}>
        <BrowserRouter>
          <ToastContainer />
            <Container id="container-root" maxWidth = {false}>
              <Routes>
                <Route path="/" element={<ProductsPage commerce={commerce}/>} />
                <Route path="/sign-up" element={<SignUp  commerce={commerce}/>} />
                <Route path="/sign-in" element={<SignIn  commerce={commerce}/>} />
                <Route path="/products" element={<ProductsPage commerce={commerce}/>} />
                <Route path="/products/:id" element={<DetailsProductPage commerce={commerce}/>} />
                <Route path="/cart" element={<CartPage commerce={commerce}/>} />
                <Route path="/thanks" element={<ThanksPage />} />
                <Route path="/contact-us" element={<ContactPage commerce={commerce}/>} />
                <Route path="/error" element={<ErrorPage />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
