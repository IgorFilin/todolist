import {v1} from "uuid";
import {
    changeFilterTodolistAC, createTodolistAC,
    deleteTodolistAC, setTodolistsAC,
    TodolistReducer, updateTitleTodolistAC
} from "./TodolistReducer";
import {FilterValuesType, TodolistDomainType} from "./TodolistReducer";
let startState: Array<TodolistDomainType> = []
let todolistId1: string
let todolistId2: string
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", addedDate: '', order: 0,entityStatus:'idle'},
        {id: todolistId2, title: "What to buy", filter: "All", addedDate: '', order: 0,entityStatus:'idle'}
    ]
})
test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let todolistId = "todolistId";
    let todolist:TodolistDomainType = {title:'newTodolist',filter:'All',id:todolistId,order:0,addedDate:'',entityStatus:'idle'}

    const endState = TodolistReducer(startState, createTodolistAC(todolistId,todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('newTodolist');
    expect(endState[0].filter).toBe("All");
    expect(endState[0].id).toBeDefined();
});
test('correct todolist should change its title', () => {

    let newTodolistTitle = "New Todolist";

    const action = updateTitleTodolistAC(newTodolistTitle, todolistId2);

    const endState = TodolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "Completed";

    const action = changeFilterTodolistAC(newFilter, todolistId2);

    const endState = TodolistReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolist should be set to state', () => {



    const action = setTodolistsAC(startState);

    const endState = TodolistReducer([], action);


    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
});


