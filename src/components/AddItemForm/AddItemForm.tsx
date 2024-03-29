import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {IconButton, TextField} from "@material-ui/core";
import {AddCircleTwoTone} from "@material-ui/icons";



type AddItemFormType = {
    addItem: (title: string) => void
    disable: boolean
}


export const AddItemForm: React.FC<AddItemFormType> = React.memo(({addItem,disable}) => {
    let [filterInput, setFilterInput] = useState("")
    let [error, setError] = useState<string | null>(null)
    let filterInputTrim = filterInput.trim()


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setFilterInput(event.currentTarget.value)
    }
    const keyPressAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && filterInput !== '') {
            addItem(filterInputTrim)
            setFilterInput('')
        } else if (event.key === 'Enter' && filterInput === '') setError('Title is requider')
    }
    const onClickAddItem = () => {
        if (filterInputTrim === '') {
            return setError('Title is requider')
        }
        addItem(filterInputTrim)
        setFilterInput('')
    }

    return (
        <div>
            <TextField disabled={disable}
                       label='Title'
                       size={"medium"}
                       variant={"outlined"}
                       error={!!error}
                       value={filterInput}
                       helperText={error}
                       onChange={onChangeHandler} onKeyDown={keyPressAddItem}
            />
            <IconButton size={"medium"}
                        disabled={disable}
                        onClick={onClickAddItem}>
                <AddCircleTwoTone/>
            </IconButton>

        </div>
    );
});

