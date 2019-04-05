import React from "react"

export default class GithubRepos extends React.Component {
  render() {
    let {repos} = this.props
    let repoNodes = []
    repos.forEach((item, index) => {
      let node = (
        <div key={item.id}>{item.name}</div>
      )
      repoNodes.push(node)
    })

    return (
      <div>{repoNodes}</div>
    )
  }
}