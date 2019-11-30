import "pm-ui/css/fonts.css"
import "pm-ui/css/main.sass"

import * as React from "react"
import * as ReactDOM from "react-dom"

import {PmCaList, PmNavBar} from "pm-ui/components"
import {PmContext, pmReducer, PmStore} from "pm-ui/store"

class PmAppShell extends React.Component {

  private str0: PmStore

  constructor() {
    super()
    const [state, dispatch] = React.useReducer(pmReducer, {cas: []})
    this.str0 = {state, dispatch}
  }

  public render() {
    return (
      <PmContext.Provider value={this.str0}>
        <div className="appContainer">
          <div className="p-16">
            <div className="frow">
              <div className="col-md-5-6">
                <PmNavBar />
                <PmCaList />
              </div>
            </div>
          </div>
        </div>
      </PmContext.Provider>
    )
  }
}

ReactDOM.render(<PmAppShell />, document.body)
