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
import { useNavigate } from "react-router-dom";

export const Notice = ({globalRate, noticesList, ourNotice}) => {
    const [sort, setSort] = useState(0);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const sortByTime = () => {
        noticesList.sort((a, b) => b.date_created.localeCompare(a.date_created))
    }
    
    const sortByRate = () => {
        noticesList.sort((a, b) => b.note - a.note);
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
        await noticesList.map((notice) => {
            axios
            .get('https://api.chec.io/v1/customers/'+notice.id_user, {headers: 'X-Authorization: '+process.env.REACT_APP_COMMERCEJS_SECRET_KEY})
            .then((res) => {
                usersList.push({'id_user':notice.id_user,'first_name':res.data.firstname, 'last_name':res.data.lastname})
            }).finally((res) => {
                setUsers(usersList);
            })
            .catch((err) => {
                navigate('/error');
            })
        })

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <StyledNotice>
            <InputNotice idNotice={ourNotice?.id} currentUserValue={ourNotice?.note} currentUserTitle={ourNotice?.Title} currentUserComment={ourNotice?.Content} />
            <hr className="section-rating-seperator" />
            <div className="section-product-rating-header">
                <h2>{(noticesList.length) ? '(' + (noticesList.length) + ' Avis) : ' + globalRate : '0 Avis'}</h2>
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
                    {noticesList.map((notice,key) => {
                        let currentUser = users.find(user => user.id_user === notice.id_user);
                        return (<FeedBack key={key} notice={notice} username={((currentUser?.first_name)&&(currentUser?.first_name)) + ' ' + ((currentUser?.last_name)&&(currentUser?.last_name))} rate={notice?.note} title={(notice?.Title)} comment={(notice?.Content)} date={notice.date_updated}/>)
                    })}
                </div>
            </div>
        </StyledNotice>
    )

}