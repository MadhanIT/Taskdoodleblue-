import {GETUSERS,CREATENEWUSER,DELETEUSER} from "../actions/types";


const initialState = {
    isAuthenticated: false,
    getUsers : null,
    createNewUser:null,
}

export default function(state=initialState, action){
    switch(action.type){
        
        case GETUSERS:
        return {
            ...state,
            getUsers : action.payload
        }
        case CREATENEWUSER:
        return {
            ...state,
            createNewUser : action.payload
        }
        case DELETEUSER:
        return {
            ...state,
            deleteUser : action.payload
        } 
        default:
            return state;
    }
}