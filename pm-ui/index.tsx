import "pm-ui/css/main.sass"

import * as React from "react"
import * as ReactDOM from "react-dom"

class TestShell extends React.Component<{}, {}> {
  public render() {
    return <div>LOL UI world :P</div>
  }
}

ReactDOM.render(<TestShell />, document.body)
