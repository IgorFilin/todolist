import {
    addNewTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    deleteTaskAC,
    setTaskAC,
    TasksReducer
} from "./TasksReducer";
import {addTodolistAC, deleteTodolistAC, setTodolistAC} from "./TodolistReducer";
import {TasksStateType} from "./TasksReducer";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
            {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
            {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2'},
            {id: "2", title: "milk", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2'},
            {id: "3", title: "tea", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2'}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = deleteTaskAC("2", "todolistId2");

    const endState = TasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
            {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
            {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2'},
            {id: "3", title: "tea", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId2'}
        ]
    });

});
test('correct task should be added to correct array', () => {
    const action = addNewTaskAC("juce", "todolistId2");

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
})
test('status of specified task should be changed', () => {
    const action = changeStatusTaskAC("2", 0, "todolistId2");

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(0);
    expect(endState["todolistId1"][1].status).toBe(2);
});
test('title of specified task should be changed', () => {
    const action = changeTitleTaskAC('Redux', "3", "todolistId1");

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"][2].title).toBe('Redux');
    expect(endState["todolistId2"][2].title).toBe("tea");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");

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

    const action = setTodolistAC([{id: 'todolistId1', title: "What to learn",  addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", addedDate: '', order: 0}]);

    const endState = TasksReducer({}, action)
    let keys = Object.keys(endState)

    expect(endState['todolistId1']).toStrictEqual([]);
    expect(keys.length).toEqual(2);
});
test('new array with tasks should be set todolist', () => {


    const arrayTasks = [
        {id: "1", title: "CSS", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
        {id: "2", title: "JS", status: 2,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'},
        {id: "3", title: "React", status: 0,addedDate:'',deadline:'',description:'',order:0,startDate:'',priority:0,todoListId:'todolistId1'}
    ]
    const action = setTaskAC(arrayTasks,'todolistId1');

    const endState = TasksReducer({}, action)
    let keys = Object.keys(endState)

    expect(endState['todolistId1']).toStrictEqual(arrayTasks);
    expect(keys.length).toEqual(1);
});



