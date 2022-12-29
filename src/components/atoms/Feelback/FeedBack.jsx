import { Rating } from '@mui/material';
import {StyledFeedBack} from './style.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const FeedBack = ({username,rate,title,comment,date}) => {

    const fbDate = new Date(date);

    return (
        <StyledFeedBack>
            <Card>
                <CardContent >
                    <div className="card-header-notice-component">
                        <Rating value={rate} size="small" readOnly/>
                        <p>{username} le {fbDate.getDay()}/{fbDate.getMonth()}/{fbDate.getFullYear()}</p>
                    </div>
                    <h4>{title}</h4>
                    <Typography>
                        {comment}
                    </Typography>
                </CardContent>
            </Card>
        </StyledFeedBack>
    )

}