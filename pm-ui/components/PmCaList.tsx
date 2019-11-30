import * as React from "react"

import {PmContext} from "pm-ui/store"

export default class PmCaList extends React.Component {
  public render() {
    const {state} = React.useContext(PmContext)
    const el = state.cas.length === 0 ? (
      <div className="empty">
        <div className="empty-icon"><i className="icon icon-3x icon-mail"></i></div>
        <p className="empty-title h5">You have no new messages</p>
        <p className="empty-subtitle">Click the button to start a conversation</p>
        <div className="empty-action">
          <button className="btn btn-primary">Send a message</button>
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
