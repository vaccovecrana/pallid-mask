import "pm-ui/css/fonts.css"
import "pm-ui/css/ui-lock.css"

import "pm-ui/css/main.sass"

import * as React from "react"
import * as ReactDOM from "react-dom"

import {PmApi, PmDbSchema} from "pm-schema"
import {PmCaList, PmNavBar, PmUiLock} from "pm-ui/components"
import {getJson} from "pm-ui/rpc"
import {ldSchema, lockUi, PmAppState, PmContext, pmReducer} from "pm-ui/store"

const initialState: PmAppState = {
  db: {idn: {}},
  uiLocked: false
}

class PmAppShell extends React.Component {

  public componentDidMount() {
    const {dispatch: d} = React.useContext(PmContext)
    d(lockUi(true))
    getJson<PmDbSchema>(PmApi.v1Schema, d)
      .then((data) => data.idn ? d(ldSchema(data)) : {})
  }

  public render() {
    const [state, dispatch] = React.useReducer(pmReducer, initialState)
    return (
      <PmContext.Provider value={{state, dispatch}}>
        <PmUiLock>
          <div className="p-16">
            <div className="frow">
              <div className="col-md-5-6">
                <PmNavBar />
                <PmCaList />
              </div>
            </div>
          </div>
        </PmUiLock>
      </PmContext.Provider>
    )
  }
}

ReactDOM.render(<PmAppShell />, document.body)
