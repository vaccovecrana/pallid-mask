import * as React from "react"

import PmCsrCard from "pm-ui/components/PmCsrCard"
import {addIdn, PmContext} from "pm-ui/store"

export default class PmIdentityList extends React.Component {
  public render() {
    const {state, dispatch} = React.useContext(PmContext)
    const identities = Object.keys(state.db.idn)
    const el = identities.length === 0 ? (
      <div className="empty">
        <div className="empty-icon"><i className="icon icon-3x icon-bookmark"></i></div>
        <p className="empty-title h5">No Identities found</p>
        <p className="empty-subtitle">Start by initializing root identities</p>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={() => dispatch(addIdn())}>
            Create New
          </button>
        </div>
      </div>
    ) : (
      <div className="frow">
        {identities.map((idk) => state.db.idn[idk])
          .sort((idn0) => idn0.certificate && idn0.certificate.isCa ? -1 : 1)
          .map((idn0) => (
            <div className={!idn0.certificate || idn0.certificate.isCa ? "col-md-1-1" : "col-md-1-2"}>
              <div className="mb-15 mx-5">
                <PmCsrCard idn={idn0} issuer={state.db.idn[idn0.issuerId]} />
              </div>
            </div>
          ))}
      </div>
    )
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
                  onClick={() => dispatch(addIdn())}>
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
