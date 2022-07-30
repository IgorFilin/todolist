import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from "../Todolist/Todolist.module.css";


type AddItemFormType = {
    addItem: (t: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
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
    const onClickaddItem = () => {
        if (filterInputTrim === '') {
            return setError('Title is requider')
        }
        addItem(filterInputTrim)
        setFilterInput('')
    }

    return (
        <div>
            <input className={error ? 'classErrorInput' : classes.inputClass} value={filterInput}
                   onChange={onChangeHandler} onKeyDown={keyPressAddItem}/>
            <button className={classes.buttonAdd} onClick={onClickaddItem}>+</button>
            {error && <div>{error}</div>}
        </div>
    );
};

