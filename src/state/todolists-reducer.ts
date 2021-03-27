import {TodolistsType} from "../App";



export const todolistsReducer = (state: TodolistsType[], action:ActionsType):TodolistsType[] =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            let newTodolist:TodolistsType = {id:action.todolistID3, title:action.title, filter:'all'}
            return [newTodolist,...state]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            let todolist = state.find(t=>t.id===action.id)
            if (todolist)
                todolist.title=action.title
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let filterTask=  state.find(t=>t.id===action.id)
            if (filterTask)
                filterTask.filter=action.filter
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (id: string)  =>({type: 'REMOVE-TODOLIST',id}as const)
export const AddTodolistsAC = (todolistID3:string,title:string) =>({type: 'ADD-TODOLIST',todolistID3,title}as const)
export const  ChangeTodolistsTitlestAC = (title:string,id:string) =>({type: 'CHANGE-TODOLIST-TITLE',id,title}as const)
export const  ChangeTodolistsFiltersTitlestAC = (filter:"all" | "completed" | "active",id:string) =>({type: 'CHANGE-TODOLIST-FILTER',id,filter}as const)


type ActionsType =
    RemoveTodolistActionType
    | AddTodolistsActionType
    | ChangeTodolistsTitlesActionType
    | ChangeTodolistsFiltersActionType


export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistsActionType = ReturnType<typeof AddTodolistsAC>
export type ChangeTodolistsTitlesActionType = ReturnType<typeof ChangeTodolistsTitlestAC>
export type ChangeTodolistsFiltersActionType = ReturnType<typeof ChangeTodolistsFiltersTitlestAC>