import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMods = () => setEditMode(true)
    const offEditMods = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onEnterOffEditMode = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Enter'){
            offEditMods()
        }
    }
    return (
        editMode
            ?
            <TextField

                value={title}
                autoFocus={true}// почитати
                onBlur={offEditMods}
                onChange={onChangeTitle}
                onKeyPress={onEnterOffEditMode}

            />

            // <input
            //     value={title}
            //     autoFocus={true}// почитати
            //     onBlur={offEditMods}
            //     onChange={onChangeTitle}
            //     onKeyPress={onEnterOffEditMode}
            // />
            : <span onDoubleClick={onEditMods}>{props.title}</span>
    );
}