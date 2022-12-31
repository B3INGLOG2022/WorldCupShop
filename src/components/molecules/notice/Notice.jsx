import { useState } from "react";
import { Rating } from '@mui/material';
import {StyledNotice} from './style.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FeedBack } from "../../atoms/Feelback/FeedBack.jsx";
import { InputNotice } from "../InputNotice/InputNotice.jsx";
import Select from '@mui/material/Select';
import { useEffect } from "react";
import axios from 'axios';

export const Notice = ({globalRate, NoticesList}) => {

    const [sort, setSort] = useState(0);
    const [users, setUsers] = useState([]);

    const sortByTime = () => {
        NoticesList.sort((a, b) => b.date_updated.localeCompare(a.date_updated))
    }
    
    const sortByRate = () => {
        NoticesList.sort((a, b) => b.note - a.note);
    }

    const handleChangeSort = (event) => {
        setSort(event.target.value);
        if (event.target.value === 1){
            sortByTime()
        } else if (event.target.value === 2) {
            sortByRate()
        }
    };

    const fetchUsers = async () => {
        let usersList = [];
        await NoticesList.map((notice) => {
            axios
            .get('https://api.chec.io/v1/customers/'+notice.id_user, {headers: 'X-Authorization: '+process.env.REACT_APP_COMMERCEJS_SECRET_KEY})
            .then((res) => {
                //TODO : faire en sorte d'avoir [id_user] : {'first_name':res.data.firstname, 'last_name':res.data.lastname} et de pouvoir récupéré les valeurs grâce aux index : useerList['cstmr_p6dP5gp0Xkln7k']
                usersList.push({'id_user':notice.id_user,'first_name':res.data.firstname, 'last_name':res.data.lastname})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        console.log(usersList)
        setUsers(usersList);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <StyledNotice>
            <InputNotice />
            <hr className="section-rating-seperator" />
            <div className="section-product-rating-header">
                <h2>{(NoticesList.length) ? '(' + (NoticesList.length) + ' Avis) : ' + globalRate : '0 Avis'}</h2>
                <Rating readOnly precision={0.1} value={Number(globalRate)}/>
            </div>
            <div className="section-rating-body" >
                <FormControl sx={{ m: 1, minWidth: 80, mt: 2,}}>
                    <InputLabel>Trier par</InputLabel>
                    <Select
                        value={sort}
                        onChange={handleChangeSort}
                        autoWidth
                        label="Trier par"
                    >
                        <MenuItem value={0}>Choisir</MenuItem>
                        <MenuItem value={1}>Avis les plus récents</MenuItem>
                        <MenuItem value={2}>Les meilleurs notes</MenuItem>
                    </Select>
                </FormControl>
                <div className="section-rating-body-list">
                    {NoticesList.map((notice,key) => {
                        //TODO : A FAIRE 
                        let index = users.indexOf(notice.id_user)
                        console.log(index)
                        return (<FeedBack key={key} username={users[index]?.first_name + ' ' + users[index]?.last_name} rate={notice?.note} title={(notice?.Title || notice?.title)} comment={(notice?.Content || notice?.content)} date={notice.date_updated}/>)
                    })}
                </div>
            </div>
        </StyledNotice>
    )

}