import { createStore} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

const defaultState = {
    firstname: null,
    lastname: null,
    location: null,
    phonenumber: null,
    email: null,
    description: null,
    hardskill: [],
    softskill: [],
    imagesrc: null
}

const SET_FIRSTNAME = 'SET_FIRSTNAME';
const SET_LASTNAME = 'SET_LASTNAME';
const SET_LOCATION = 'SET_LOCATION';
const SET_PHONENUMBER = 'SET_PHONENUMBER';
const SET_EMAIL = 'SET_EMAIL';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_HARDSKILL = 'SET_HARDSKILL';
const SET_SOFTSKILL = 'SET_SOFTSKILL';
const SET_IMAGESRC = 'SET_IMAGESRC';
const RESET = 'RESET';

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FIRSTNAME:
            return {...state, firstname: action.payload}
        case SET_LASTNAME:
            return {...state, lastname: action.payload}
        case SET_LOCATION:
            return {...state, location: action.payload}
        case SET_PHONENUMBER:
            return {...state, phonenumber: action.payload}
        case SET_EMAIL:
            return {...state, email: action.payload}
        case SET_DESCRIPTION:
            return {...state, description: action.payload}
        case SET_HARDSKILL:
            return {...state, hardskill:action.payload}
        case SET_SOFTSKILL:
            return {...state, softskill: action.payload}
        case SET_IMAGESRC:
            return {...state, imagesrc: action.payload}
        case RESET:
            return defaultState;
        default:
            return state
    }
}

export const store = createStore(reducer, composeWithDevTools());

// export const setFirstName = (payload) => ({type: SET_FIRSTNAME, payload: payload})
// export const setLastName = (payload) => ({type: SET_LASTNAME, payload: payload})
// export const setLocation = (payload) => ({type: SET_LOCATION, payload: payload})
// export const setPhoneNumber = (payload) => ({type: SET_PHONENUMBER, payload: payload})
// export const setEmail = (payload) => ({type: SET_EMAIL, payload: payload})
export const setDescription = (payload) => ({type: SET_DESCRIPTION, payload: payload})
export const setHardSkills = (payload) => ({type: SET_HARDSKILL, payload: payload})
export const setSoftSkills = (payload) => ({type: SET_SOFTSKILL, payload: payload})
export const setImageSrc = (payload) => ({type: SET_IMAGESRC, payload: payload})
export const resetState = () => ({type: RESET, payload: null})