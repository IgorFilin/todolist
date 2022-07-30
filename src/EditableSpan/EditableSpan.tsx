import React, {ChangeEvent, useState} from 'react';

type EditableSpanTypeProps = {
    title: string
    changeTitle: (t: string) => void
}

export const EditableSpan = (props: EditableSpanTypeProps) => {
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
        editMode ? <input value={valueInput} onChange={onChangeHandker} onBlur={changeEditModeOnBlur} autoFocus/> :
            <span onDoubleClick={changeEditModeOnDoubleClick}>{props.title}</span>
    );
};

