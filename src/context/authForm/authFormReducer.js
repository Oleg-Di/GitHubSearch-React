import { AUTH_DATA, AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../types"



export const authReducer = (state, action) => {

    switch (action.type) {
        case AUTH_DATA: return {...state, formControls:{...action.payload.formControls}, isFormValid: action.payload.isFormValid}
        case AUTH_SUCCESS: return {...state,authError: false, token: action.payload}  
        case AUTH_LOGOUT: return {...state, token:null}  
        case AUTH_ERROR: return {...state, authError: true}
         
    
        default:  return state
           
    }
}