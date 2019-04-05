import React from "react"

export default class Headline extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>{this.props.text}</h1>
              <p>{this.props.children}</p>
            </div>
        )
    }
}
