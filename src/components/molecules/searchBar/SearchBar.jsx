import {StyledSearchBar} from './style.js';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export const SearchBar = ({options, setSearchBarValue}) => {

    const [searchValue, setSearchValue] = useState('')

    return (

        <StyledSearchBar>
            <div className='searchBar-productsList'>
                <Autocomplete
                    freeSolo
                    disableClearable
                    onInputChange={(e,v)=>setSearchValue(v)}
                    options={options.map((product) => product.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recherchez votre équipe"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                            sx={{backgroundColor:"#FFFFFF"}}
                        />
                    )}
                />
            </div>
            <div className='searchBtn-productList'>
                <SearchIcon onClick={()=>{
                    setSearchBarValue(searchValue)}}/>
            </div>
        </StyledSearchBar>
    )

}