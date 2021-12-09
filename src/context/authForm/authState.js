import { useReducer } from "react";
import { authReducer } from "./authFormReducer";
import { AuthContext } from "./authContext";
import { AUTH_DATA, AUTH_LOGOUT, AUTH_SUCCESS } from "../types";
import axios from "axios";
import { AUTH_ERROR } from './../types';

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const apiKey = "AIzaSyCDDCjNhxisXL9q8gyNPiQbCwqLceVpaKM";

export const AuthState = ({ children }) => {
  const initialState = {
    authError: false,
    token: null,
    isFormValid: true,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "floatingInput",
        errorMessage: "Enter correct email...",
        valid: true,
        touched: false,
        placeHolder: "Enter email...",
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "floatingPassword",
        errorMessage: "Enter correct password...",
        valid: true,
        touched: false,
        placeHolder: "Enter password...",
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const registerHandler = async () => {
    let formData = {
      email: state.formControls.email.value,
      password: state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const authSuccess = (token) => {
    console.log(state.token);
   return  dispatch({
      type: AUTH_SUCCESS,
      payload: token
    })
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    console.log(localStorage, state);
    return dispatch({
        type: AUTH_LOGOUT
    })
  }
  const loginHandler = async () => {
    let formData = {
      email: state.formControls.email.value,
      password: state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        formData
      );
      const data = response.data
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      authSuccess(data.idToken)
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR
      })

    }
    
  };
  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };
  const onChangeHandler = (event, controlName) => {
    const formControls = { ...state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((item) => {
      isFormValid = formControls[item].valid && isFormValid;
    });

    dispatch({
      type: AUTH_DATA,
      payload: {
        formControls,
        isFormValid,
      },
    });
  };
  const { email, password } = state.formControls;
  const { isFormValid, formControls, token, authError } = state;
  return (
    <AuthContext.Provider
      value={{
        authError,
        logout,
        registerHandler,
        loginHandler,
        submitHandler,
        onChangeHandler,
        token,
        email,
        password,
        isFormValid,
        formControls,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
