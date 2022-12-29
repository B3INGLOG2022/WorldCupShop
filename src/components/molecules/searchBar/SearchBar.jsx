import {StyledSearchBar} from './style.js';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({options}) => {

    return (

        <StyledSearchBar>
            <div className='searchBar-productsList'>
                <Autocomplete
                    freeSolo
                    disableClearable
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
                <SearchIcon/>
            </div>
        </StyledSearchBar>
    )

}