import * as React from "react"

import {PmApi, PmDbSchema} from "pm-schema"
import PmCsrCard from "pm-ui/components/PmCsrCard"
import {getJson} from "pm-ui/rpc"
import {ldSchema, lockUi, PmContext} from "pm-ui/store"

export default class PmCaList extends React.Component {

  public componentDidMount() {
    const {dispatch: d} = React.useContext(PmContext)
    d(lockUi(true))
    getJson<PmDbSchema>(PmApi.v1Schema, d)
      .then((data) => data.cas ? d(ldSchema(data)) : {})
  }

  public render() {
    const {state, dispatch} = React.useContext(PmContext)
    const cks = Object.keys(state.db.cas)
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
    ) : cks.map((cak) => (
      <div className="mb-15">
        <PmCsrCard ca={state.db.cas[cak]} />
      </div>
    ))
    return (
      <div className="frow">
        <div className="col-md-1-1">
          <h2>Certificate Authorities</h2>
          {el}
        </div>
      </div>
    )
  }
}
