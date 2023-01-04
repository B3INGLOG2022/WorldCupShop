import { IconButton, MenuItem, TextField } from '@mui/material';
import {StyledStock} from './style.js'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Stock = ({handleAddOneItem, handleRemoveOneItem, stock}) => { 
    
    const addOneStock = () => {
        if (stock < 10) {
            handleAddOneItem();
        }
    }

    const removeOneStock = () => {
        if (stock > 1) {
            handleRemoveOneItem();
        }
    }

     return (
        <StyledStock>
            <TextField
                className="cart-stock-textfield"
                disabled
                value={stock}
            >
                <MenuItem key={1} value={1}>1</MenuItem>
                <MenuItem key={2} value={2}>2</MenuItem>
                <MenuItem key={3} value={3}>3</MenuItem>
                <MenuItem key={4} value={4}>4</MenuItem>
                <MenuItem key={5} value={5}>5</MenuItem>
                <MenuItem key={6} value={6}>6</MenuItem>
                <MenuItem key={7} value={7}>7</MenuItem>
                <MenuItem key={8} value={8}>8</MenuItem>
                <MenuItem key={9} value={9}>9</MenuItem>
                <MenuItem key={10} value={10}>10</MenuItem>
            </TextField>
            <div className="cart-stock-count-btn">
                <IconButton aria-label="scroll to top" onClick={() => {addOneStock()}} disabled={(stock < 10)?false:true}>
                    <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton aria-label="scroll to top" onClick={() => {removeOneStock()}} disabled={(stock > 1)?false:true}>
                    <KeyboardArrowDownIcon />
                </IconButton>
            </div>
        </StyledStock>
     )
};
 
