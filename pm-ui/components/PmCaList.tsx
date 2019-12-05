import * as React from "react"

import PmCsrCard from "pm-ui/components/PmCsrCard"
import {addCa, PmContext} from "pm-ui/store"

export default class PmCaList extends React.Component {
  public render() {
    const {state, dispatch} = React.useContext(PmContext)
    const cks = Object.keys(state.db.idn)
    const el = cks.length === 0 ? (
      <div className="empty">
        <div className="empty-icon"><i className="icon icon-3x icon-bookmark"></i></div>
        <p className="empty-title h5">No Identities found</p>
        <p className="empty-subtitle">Start by initializing root identities</p>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={() => dispatch(addCa())}>
            Create New
          </button>
        </div>
      </div>
    ) : cks.map((cak) => (
      <div className="mb-15">
        <PmCsrCard ca={state.db.idn[cak]} />
      </div>
    ))
    return (
      <div className="frow">
        <div className="col-md-1-1">
          <div className="frow">
            <div className="col-xs-6-7">
              <h2>Identities</h2>
            </div>
            <div className="col-xs-1-7">
              <div className="mt-8 text-right">
                <button class="btn btn-action btn-sm s-circle"
                  onClick={() => dispatch(addCa())}>
                  <i class="icon icon-plus"></i>
                </button>
              </div>
            </div>
          </div>
          {el}
        </div>
      </div>
    )
  }
}
