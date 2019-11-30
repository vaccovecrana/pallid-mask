import * as React from "react"

import PmCsrCard from "pm-ui/components/PmCsrCard"
import {PmContext} from "pm-ui/store"

export default class PmCaList extends React.Component {

  public render() {
    const {state, dispatch} = React.useContext(PmContext)
    const cks = Object.keys(state.cas)
    const el = cks.length === 0 ? (
      <div className="empty">
        <div className="empty-icon"><i className="icon icon-3x icon-bookmark"></i></div>
        <p className="empty-title h5">No Certificate Authorities found</p>
        <p className="empty-subtitle">Start by initializing a root CA</p>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={() => dispatch({type: "addCa"})}>
            Create New
          </button>
        </div>
      </div>
    ) : cks.map((cak) => <PmCsrCard ca={state.cas[cak]} />)
    return (
      <div className="frow">
        <div className="col-md-1-1">
          <h2>Certificate Authorities</h2>
          <div className="divider"/>
          {el}
        </div>
      </div>
    )
  }
}
