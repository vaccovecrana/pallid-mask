import "pm-ui/css/fonts.css"
import "pm-ui/css/main.sass"

import * as React from "react"
import * as ReactDOM from "react-dom"

import {PmDbSchema} from "pm-schema"
import {PmCaList, PmNavBar} from "pm-ui/components"
import {PmContext, pmReducer} from "pm-ui/store"

const initialState: PmDbSchema = {cas: []}

class PmAppShell extends React.Component {
  public render() {
    const [state, dispatch] = React.useReducer(pmReducer, initialState)
    return (
      <PmContext.Provider value={{state, dispatch}}>
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
