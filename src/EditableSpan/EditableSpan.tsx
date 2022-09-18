import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanTypeProps = {
    title: string
    changeTitle: (t: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanTypeProps) => {
    const [editMode, setEditMode] = useState(false)
    const [valueInput, valueInputTitle] = useState(props.title)

    const changeEditModeOnDoubleClick = () => {
        setEditMode(true)
    }
    const changeEditModeOnBlur = () => {
        setEditMode(false)
        props.changeTitle(valueInput)
    }


    const onChangeHandker = (e: ChangeEvent<HTMLInputElement>) => {
        valueInputTitle(e.currentTarget.value)
    }
    return (
        editMode ?
            <TextField variant={"standard"} value={valueInput} onChange={onChangeHandker} onBlur={changeEditModeOnBlur}
                       autoFocus/> :
            <span style={{fontSize: '15px'}} onDoubleClick={changeEditModeOnDoubleClick}>{props.title}</span>
    );
});

