import React from "react"

import {connect} from "react-redux"

import * as counterActions from "../actions/counterActions"
import {fetchRepos} from "../actions/githubActions"
import Headline from "../components/Headline"
import GithubReposComponent from "../components/githubRepos"

class CounterApp extends React.Component {

    componentDidMount = () => {
        console.log(this.props)
        let {githubReducer, fetchGithubRepos} = this.props;
        if (!githubReducer.isLoadingRepos && githubReducer.repos === undefined) {
            fetchGithubRepos();
        }
    }

    renderLoading() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        Loading...
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let {counterReducer, githubReducer} = this.props;

        if (githubReducer.isLoadingRepos || githubReducer.repos === undefined) {
            return this.renderLoading()
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <Headline text={"Sample App!"}/>
                        </div>

                        <div>
                            <button onClick={() => this.props.handleIncrease()}>INCREASE</button>
                            <p> {counterReducer.clicks}</p>
                            <div>
                                <button onClick={() => this.props.handleSubtract()}>DECREASE</button>
                                <p>{counterReducer.clicks}</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {githubReducer.repos !== undefined &&
                            <GithubReposComponent repos={githubReducer.repos}/>
                            }
                        </div>

                    </div>
                </div>
            )
        }
    }

}

// Connects a React component to a Redux store.
// e.g.
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
const mapStateToProps = (state) => {
    return {
        counterReducer: state.counter,
        subtractReducer: state.subtract,
        githubReducer: state.githubReducer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrease: () => {
            dispatch(counterActions.increaseCounter())
        },
        handleSubtract: () => {
            dispatch(counterActions.subtractCounter())
        },
        fetchGithubRepos: () => {
            dispatch(fetchRepos())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp)