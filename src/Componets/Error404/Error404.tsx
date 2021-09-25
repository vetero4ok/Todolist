import {Button} from '@material-ui/core';
import React from 'react';
import {useHistory} from 'react-router-dom';


export const Error404: React.FC = () => {
    const history = useHistory();

    const onClickHandler = () => {
        let path = `/login`;
        history.push(path);
    }
    return <>
        <h1 style={{textAlign: 'center', fontSize: '55px'}}>The page you're looking for can't be found! </h1>
        <h3 style={{textAlign: 'center'}}>Error 404</h3>
        <div style={{textAlign: 'center'}}>
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={onClickHandler}>Ok</Button>
        </div>
    </>
}