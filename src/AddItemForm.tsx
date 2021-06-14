import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


export type AddItemFormProps = {
    addItem:(title:string)=>void
}



export function AddItemForm(props:AddItemFormProps) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onChangeKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItem(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    //const errorMessage = error ? <div style = {{color:'red' }}> Text  is required!</div>: null

    return(
        <div>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitle}// event
                onKeyPress={onChangeKeyPress}

                label={'Title'}
                error={error}
                helperText={error &&'Title is required!'}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeTitle}// event*/}
            {/*    onKeyPress={onChangeKeyPress}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            {/*<button onClick={onClickAddItem}>+</button>*/}
            <IconButton onClick={onClickAddItem} >
               <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
            {/* другой код*/}
            {/*{error && <div style={{color: 'red'}}> Text is required!</div>}*/}
        </div>

    );

}