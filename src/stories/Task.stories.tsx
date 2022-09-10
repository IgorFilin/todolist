import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Todolist/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootReducerType} from "../state/store";
import {TasksType} from "../AppWithRedux";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {

    },// пропсы на уровне компоненты
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskWithReduxStory = () => {
    const task = useSelector<AppRootReducerType,TasksType>(state => state.tasks['todolistId1'][0])
    return <Task taskId={task.id} title={task.title} isDone={task.isDone} todolistId={"todolistId1"} key={task.id}/>
}

const Template: ComponentStory<typeof TaskWithReduxStory> = (args) => <TaskWithReduxStory />; // образец истории

export const TaskReduxStory = Template.bind({});// сама компонента
TaskReduxStory.args = { // пропсы компоненты на уровне истории

};
