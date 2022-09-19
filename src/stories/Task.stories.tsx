import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Todolist/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootReducerType} from "../state/store";
import {TaskStatuses, TaskType} from "../api/tasks-api";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {

    },// пропсы на уровне компоненты
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskWithReduxStory = () => {
    const task = useSelector<AppRootReducerType,TaskType>(state => state.tasks['todolistId1'][0])
    return <Task taskId={task.id} title={task.title} status={task.status} todolistId={"todolistId1"} key={task.id} />
}

const Template: ComponentStory<typeof TaskWithReduxStory> = (args) => <TaskWithReduxStory />; // образец истории

export const TaskReduxStory = Template.bind({});// сама компонента
TaskReduxStory.args = { // пропсы компоненты на уровне истории

};
