import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // log in
        history.push('/');
    } catch (error) {
        console.log(error.message); 
    }    
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // sign up
        history.push('/');
    } catch (error) {
        console.log(error.message); 
    }    
}

