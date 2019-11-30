import * as React from "react"

import {PmContext} from "pm-ui/store"

export default class PmCaList extends React.Component {
  public render() {
    const {state, dispatch} = React.useContext(PmContext)
    const el = state.cas.length === 0 ? (
      <div className="empty">
        <div className="empty-icon"><i className="icon icon-3x icon-bookmark"></i></div>
        <p className="empty-title h5">No Certificate Authorities initialized</p>
        <p className="empty-subtitle">Start by initializing a root CA</p>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={() => dispatch({type: "addCa"})}>
            Create New
          </button>
        </div>
      </div>
    ) : (<div />)
    return (
      <div className="frow">
        <div className="col-md-1-1">
          {el}
        </div>
      </div>
    )
  }
}
