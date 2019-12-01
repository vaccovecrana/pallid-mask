import * as React from "react"

import {PmApi, PmCertificateAuthority} from "pm-schema"
import {postJsonIo} from "pm-ui/rpc"
import {lockUi, PmContext, updCa} from "pm-ui/store"
import PmCsrEditor from "./PmCsrEditor"

export default class PmCsrCard extends React.Component<{ca: PmCertificateAuthority}> {

  public onUpdate(ca: PmCertificateAuthority) {
    const {dispatch: d} = React.useContext(PmContext)
    d(updCa(ca))
  }

  public onSubmit() {
    const {dispatch: d} = React.useContext(PmContext)
    d(lockUi(true))
    postJsonIo<PmCertificateAuthority>(PmApi.v1Ca, this.props.ca, d)
      .then((ca0) => this.onUpdate(ca0))
  }

  public renderCsrEditor(ca: PmCertificateAuthority) {
    return (
      <PmCsrEditor csr={ca.csrMetadata} onSubmit={() => this.onSubmit()}
        onChange={(csr0) => this.onUpdate({...ca, csrMetadata: csr0})} />
    )
  }

  public renderCaInfoCard(ca: PmCertificateAuthority) {
    const cm = ca.csrMetadata
    return (
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title">
                {cm.CN} ::&nbsp;
                <small>
                  {cm.key.algo}, {cm.key.size}&nbsp;
                  ({ca.csrMetadata.names.map((n0) => (
                    [n0.C, n0.L, n0.O, n0.OU, n0.ST].filter((txt) => txt !== undefined).join(", ")
                  ))})
                </small>
                <div className="divider" style={{margin: 0}} />
              </div>
            </div>
            <div className="tile-action"></div>
          </div>
        </div>
      </div>
    )
  }

  public render() {
    const {ca} = this.props
    return ca.certificate ? this.renderCaInfoCard(ca) : this.renderCsrEditor(ca)
  }
}
