import * as githubActions from "../actions/githubActions"

const initialState = {
    isLoadingRepos: false,
    repos: undefined,
}

export default function github(state = initialState, action = {}) {
    switch (action.type) {
        case githubActions.FETCH_REPOS:
            return {...state, isLoadingRepos: true}
        case githubActions.FETCH_REPOS_SUCCESS:
            return {...state, isLoadingRepos: false, repos: action.res}
        case githubActions.FETCH_REPOS_ERROR400:
        case githubActions.FETCH_REPOS_ERROR500:
        case githubActions.FETCH_REPOS_FAILURE:
            return {...state, isLoadingRepos: false}
        default:
            return state
    }
}