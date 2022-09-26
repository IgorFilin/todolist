import {TasksReducer, TasksStateType} from "./TasksReducer";
import {createTodolistAC, createTodolistsThunkCreator, TodolistReducer} from "./TodolistReducer";
import {TodolistDomainType} from "./TodolistReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const todolist: TodolistDomainType = {
        id: 'todolistId1',
        title: "What to learn",
        filter: "All",
        addedDate: '',
        order: 0,
        entityStatus:'idle'
    }
    const action = createTodolistAC("todolistId1", todolist);

    const endTasksState = TasksReducer(startTasksState, action)

    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
   expect(idFromTasks).toBe('todolistId1')
   expect(idFromTodolists).toBe('todolistId1')

});