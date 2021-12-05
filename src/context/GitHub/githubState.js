import { useReducer } from "react";
import { GithubContext } from "./githubContext";
import { githubReducer } from "./gihubReducer";
import { CLEAR_USERS, GET_REPOS, GET_USER, LOAD_MORE, REPOS_LOADING, SEARCH_USERS, SET_LOADING } from "./../types";
import axios from "axios";

const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const withCreds = (url) => `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

export const GithubState = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    reposLoading: false,
    repos: [],
    page:2
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const setReposLoading = () => {
    dispatch({
      type: REPOS_LOADING
    })
  }
  const search = async (value) => {
    setLoading()

    const response = await axios.get(withCreds(`https://api.github.com/search/users?q=${value}&`))
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  };

  const loadMore = async(name) => {
    setReposLoading()
    const response = await axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&page=${state.page}&`))
    
    console.log(state);
    dispatch({
        type: LOAD_MORE,
        payload: response.data
    })
  }

  const getUser = async name => {
    setLoading()

    // const response = await axios.get(withCreds(`https://api.github.com/users/${name}?`))
    const response = await axios.get(`https://api.github.com/users/${name}`)
    
    dispatch({
        type: GET_USER,
        payload: response.data
    })
  }
  const getRepos = async name => {
    setLoading()
    const response = await axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&page=1&`))
  
    dispatch({
        type: GET_REPOS,
        payload: response.data
    })
  }
  const clearUsers = () => dispatch({type: CLEAR_USERS})
  const setLoading = () => dispatch({type: SET_LOADING})
  const {user,users,repos,loading,reposLoading} = state
  return <GithubContext.Provider value={{setLoading, search, getUser, getRepos, clearUsers, user,users,repos,loading,loadMore,reposLoading}}>
      {children}
      </GithubContext.Provider>;
};
