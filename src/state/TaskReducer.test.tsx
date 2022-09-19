import {
    createTaskAC,
    deleteTaskAC,
    setTaskAC,
    TasksReducer, updateTaskAC
} from "./TasksReducer";
import {createTodolistAC, deleteTodolistAC, setTodolistsAC, TodolistDomainType} from "./TodolistReducer";
import {TasksStateType} from "./TasksReducer";
import {TaskType, updateTaskType} from "../api/tasks-api";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
            {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
            {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false},
            {id: "2", title: "milk", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false},
            {id: "3", title: "tea", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = deleteTaskAC("todolistId2", "2");

    const endState = TasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
            {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
            {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false},
            {id: "3", title: "tea", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false}
        ]
    });

});
test('correct task should be added to correct array', () => {
    const task:TaskType = {id: "4", title: "newTitle", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2',completed:false}
    const action = createTaskAC("todolistId2",task );

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].title).toBe("newTitle");
    expect(endState["todolistId2"][0].status).toBe(2);
})
test('status of specified task should be changed', () => {
    const task:TaskType = {
        title:'newTitleTask',
        todoListId:'todolistId2',
        id:'2',
        order:0,
        status:0,
        completed:false,
        deadline:'',
        priority:0,
        startDate:'',
        description:'',
        addedDate:'',
    }
    const action = updateTaskAC("todolistId2", '2', task);

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
});
test('title of specified task should be changed', () => {
    const task:TaskType = {
        title:'Redux',
        todoListId:'todolistId1',
        id:'3',
        order:0,
        status:0,
        completed:false,
        deadline:'',
        priority:0,
        startDate:'',
        description:'',
        addedDate:'',
    }
    const action = updateTaskAC('todolistId1', "3", task);

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"][2].title).toBe('Redux');
    expect(endState["todolistId2"][2].title).toBe("tea");
});
test('new array should be added when new todolist is added', () => {
    const todolist:TodolistDomainType = {title:'',addedDate:'',order:2,id:'todolistId3',filter:'All'}
    const action = createTodolistAC('todolistId3', todolist);

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = deleteTodolistAC("todolistId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('new array should be added when set todolists', () => {

    const action = setTodolistsAC([{id: 'todolistId1', title: "What to learn",  addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", addedDate: '', order: 0}]);

    const endState = TasksReducer({}, action)
    let keys = Object.keys(endState)

    expect(endState['todolistId1']).toStrictEqual([]);
    expect(keys.length).toEqual(2);
});
test('new array with tasks should be set todolist', () => {


    const arrayTasks:Array<TaskType> = [
        {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
        {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false},
        {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1',completed:false}
    ]
    const action = setTaskAC(arrayTasks,'todolistId1');

    const endState = TasksReducer({}, action)
    let keys = Object.keys(endState)

    expect(endState['todolistId1']).toStrictEqual(arrayTasks);
    expect(keys.length).toEqual(1);
});



