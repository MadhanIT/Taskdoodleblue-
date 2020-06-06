import axios from 'axios';
import {GET_ERRORS,GETUSERS,CREATENEWUSER,DELETEUSER} from './types';


export const UserCreate = (storeData, history) => dispatch => {
    
  axios.post("/api/user/UserCreate", storeData).then(res => {
      
    dispatch({
      type: CREATENEWUSER,
      payload: res.data
    });
      
  }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }));
};
export const UserDelete = (storeData, history) => dispatch => {
    
  axios.post("/api/user/UserDelete", storeData).then(res => {
      
    dispatch({
      type: DELETEUSER,
      payload: res.data
    });
      
  }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }));
};

export const GetUserData = (storeData, history) => dispatch => {
    
  axios.get("/api/user/getUsers", storeData).then(res => {
    dispatch({
      type: GETUSERS,
      payload: res.data
    });
  }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
  }));
};
 