
import { SEARCH_USERS, GET_REPOS, GET_USER, SET_LOADING, CLEAR_USERS, LOAD_MORE, REPOS_LOADING } from './../types';

export const githubReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_USERS: return {...state, users: action.payload, loading:false} 
        case GET_REPOS : return {...state, repos: action.payload, loading: false} 
        case GET_USER : return {...state, user: action.payload, loading: false}
        case SET_LOADING: return {...state, loading: true}
        case CLEAR_USERS: return {...state, users: []}   
        case LOAD_MORE: return {...state, page: state.page++, repos: [...state.repos, ...action.payload], reposLoading: false}
        case REPOS_LOADING: return {...state, reposLoading: true}
            
    
        default: return state
           
    }
}