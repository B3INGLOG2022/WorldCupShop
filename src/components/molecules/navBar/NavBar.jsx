import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {StyledNavBar} from './style.js';
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import logo_WCS from "../../../imgs/logos/WORLDCUPSHOP_logo_rbg.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";

export default function Navbar() {

    const [open, setState] = useState(false);
    const navigate = useNavigate();
    
    const handleSignInClick = () => navigate('/SignIn');
    const handleSignOutClick = () => navigate('/SignUp');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setState(open);
    };

    return (

        <StyledNavBar>
            <AppBar className="NavBar" position="static" color="inherit">
                <Container maxWidth="xl" disableGutters={true}>
                    <Toolbar id="NavBar-Menu">
                        <Link to={"/"}>
                            <img src={logo_WCS} alt="WCS_logo" />
                        </Link>
                        <Box id="NavBar-Web-Menu" component="div" sx={{
                            display: {
                                xs: 'none',
                                sm: 'block',
                            }
                            }}
                        >
                            <nav>
                                <ul id="NavBar-Web-Menu-left">
                                    <li><Link to='/'>
                                            <ListItemText primary="Accueil" sx={{color: "#AD0505"}} />
                                        </Link>
                                    </li>
                                    <li><Link to='/Products'>
                                            <ListItemText primary="Produits" sx={{color: "#AD0505"}}/>
                                        </Link>
                                    </li>
                                </ul>
                                <ul id="NavBar-Web-Menu-right">
                                    {/* <li><Link to='/favorites'>
                                                <ListItemIcon>
                                                    <FavoriteIcon sx={{color: "#AD0505"}} />
                                                </ListItemIcon>
                                                <ListItemText primary="Favoris" sx={{color: "#AD0505"}}/>
                                        </Link>
                                    </li> */}
                                    <li><Link to='/Cart'>
                                                <ListItemIcon>
                                                    <ShoppingCartIcon sx={{color: "#AD0505"}}/>
                                                </ListItemIcon >
                                                <ListItemText primary="Panier" sx={{color: "#AD0505"}}/>
                                        </Link>
                                    </li>
                                    <li><Link to='/SignIn'>
                                                <ListItemIcon>
                                                    <PersonIcon sx={{color: "#AD0505"}}/>
                                                </ListItemIcon >
                                                <ListItemText primary="Connexion" sx={{color: "#AD0505"}}/>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </Box>

                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="open drawer" 
                            onClick={toggleDrawer(true)}
                            sx={{ 
                                mr: 2,
                                display: {
                                xs: 'block',
                                sm: 'none',
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <SwipeableDrawer
                            anchor="right"
                            open={open}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                        >
                            <Box sx={{
                                p: 8,
                                height: 1,
                                backgroundColor: "#D9D5D2",
                                }}
                            >

                                <IconButton sx={{mb: 2}} onClick={toggleDrawer(false)}>
                                    <CloseIcon />
                                </IconButton>

                                <Divider sx={{mb: 2}} />

                                <Box sx={{mb: 2}} className=".Burger-Options-NavBar">
                                    <Link to={"/"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <HomeIcon sx={{color: "#AD0505"}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Accueil" sx={{color: "#AD0505"}} />
                                        </ListItemButton>
                                    </Link>

                                    <Link to={"/products"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SearchIcon sx={{color: "#AD0505"}}/>
                                            </ListItemIcon >
                                            <ListItemText primary="Produits" sx={{color: "#AD0505"}}/>
                                        </ListItemButton>
                                    </Link>

                                    {/* <Link to={"/favorites"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <FavoriteIcon sx={{color: "#AD0505"}} />
                                            </ListItemIcon>
                                            <ListItemText primary="Favoris" sx={{color: "#AD0505"}}/>
                                        </ListItemButton>
                                    </Link> */}

                                    <Link to={"/Cart"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ShoppingCartIcon sx={{color: "#AD0505"}}/>
                                            </ListItemIcon >
                                            <ListItemText primary="Panier" sx={{color: "#AD0505"}}/>
                                        </ListItemButton>
                                    </Link>
                                </Box>
                                
                                <Box sx={{
                                    display: "flex", 
                                    justifyContent:"center", 
                                    position: "absolute", 
                                    bottom: "0", 
                                    left: "50%", 
                                    transform: "translate(-50%, 0)"}}
                                >
                                    <Button onClick={handleSignOutClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#FFFFFF",color: "#AD0505"}}>S'inscrire</Button>
                                    <Button onClick={handleSignInClick} color="inherit" variant="contained" sx={{m:1, width: .5, backgroundColor: "#AD0505",color: "#FFFFFF"}}>Connexion</Button>
                                </Box>
                            </Box>
                        
                        </SwipeableDrawer>
                    

                    </Toolbar>
                </Container>
            </AppBar>
        </StyledNavBar>
    );
}