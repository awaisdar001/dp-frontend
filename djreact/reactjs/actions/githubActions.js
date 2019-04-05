import {request} from "../utils"

export const FETCH_REPOS = "FETCH_REPOS"
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS"
export const FETCH_REPOS_ERROR400 = "FETCH_REPOS_ERROR400"
export const FETCH_REPOS_ERROR500 = "FETCH_REPOS_ERROR500"
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE"


export function fetchRepos() {
    return function (dispatch) {
        let url = "https://api.github.com/users/awaisdar001/repos"
        dispatch({type: FETCH_REPOS})
        return request(
            url, {},
            (json) => {
                dispatch({type: FETCH_REPOS_SUCCESS, res: json})
            },
            (json) => {
                dispatch({type: FETCH_REPOS_ERROR400, res: json})
            },
            (res) => {
                dispatch({type: FETCH_REPOS_ERROR500, res: res})
            },
            (ex) => {
                dispatch({type: FETCH_REPOS_FAILURE, error: ex})
            },
        )
    }
}