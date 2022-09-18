import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    TodolistReducer
} from "./TodolistReducer";
import {FilterValuesType, TodolistDomainType} from "../AppWithRedux";

let startState: Array<TodolistDomainType> = []
let todolistId1: string
let todolistId2: string
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "All",addedDate:'',order:0},
        {id: todolistId2, title: "What to buy", filter: "All",addedDate:'',order:0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


    const endState = TodolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("All");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTitleTodolistAC(newTodolistTitle, todolistId2);

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


