import * as React from "react"

import {PmApi, PmIdentity, profilesOf, v1IdnBundleIdnIdParam} from "pm-schema"
import {postJsonIo, putJsonIo} from "pm-ui/rpc"
import {delIdn, lockUi, PmContext, updIdn} from "pm-ui/store"
import {nextInt} from "pm-ui/util"
import PmCaProfileList from "./PmCaProfileList"
import PmCsrEditor from "./PmCsrEditor"

interface PmCsrCardProps {
  idn: PmIdentity
  issuer?: PmIdentity
}

export default class PmCsrCard extends React.Component<PmCsrCardProps> {

  public onUpdate(ca: PmIdentity) {
    const {dispatch: d} = React.useContext(PmContext)
    d(updIdn(ca))
  }

  public onSubmit() {
    const {dispatch: d} = React.useContext(PmContext)
    d(lockUi(true))
    postJsonIo<PmIdentity>(PmApi.v1Idn, this.props.idn, d)
      .then((ca0) => this.onUpdate(ca0))
  }

  public onSubmitUpdate() {
    const {dispatch: d} = React.useContext(PmContext)
    d(lockUi(true))
    putJsonIo<PmIdentity>(PmApi.v1Idn, this.props.idn, d)
  }

  public renderCsrEditor() {
    const {idn} = this.props
    const {dispatch: d, state} = React.useContext(PmContext)
    return (
      <PmCsrEditor csr={idn.csrMetadata} signingIdn={
        Object.keys(state.db.idn).map((ck) => state.db.idn[ck])
          .filter((idn0) => idn0.certificate !== undefined)
          .filter((idn0) => idn0.certificate.isCa)
        } onSubmit={() => this.onSubmit()} onDelete={() => d(delIdn(idn))}
        onChange={(csr0) => this.onUpdate({...idn, csrMetadata: csr0})}
        onSelectIssuer={(issuerId, issuerProfileTag) => this.onUpdate({...idn, issuerId, issuerProfileTag})}
      />
    )
  }

  public nonDefaultProfiles() {
    return profilesOf(this.props.idn).filter((pk) => pk.pm_tag !== "default")
  }

  public onAddProfile() {
    const {idn} = this.props
    this.onUpdate({...idn,
      signingConfig: {...idn.signingConfig,
        signing: {...idn.signingConfig.signing,
          profiles: {...idn.signingConfig.signing.profiles,
            new: {
              pm_id: nextInt(), pm_tag: "new",
              usages: [], ca_constraint: {is_ca: false}
            }
          }
        }
      }
    })
  }

  public renderIssuerRow() {
    const {issuer} = this.props
    return issuer ? (
      <div className="mt-16">
        <div className="frow">
          <div className="col-xs-1-5">Issuer</div>
          <div className="col-xs-4-5">
            <pre style={{
              marginTop: 3, marginLeft: 8,
              marginBottom: 0, marginRight: 0, fontSize: 11
            }}>
              {issuer.csrMetadata.CN}
            </pre>
          </div>
        </div>
      </div>
    ) : <div />
  }

  public renderCaInfoCard() {
    const {idn} = this.props
    const csr = idn.csrMetadata
    const isCa = idn.certificate && idn.certificate.isCa
    const {signing} = idn.signingConfig
    const profiles = [signing.default, ...this.nonDefaultProfiles()]
    return (
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title">
                <div className="frow">
                  <div className="col-md-4-5">
                    <div className="mb-8">
                      <span className="text-primary mr-4">
                        {isCa ? <i class="icon icon-bookmark" /> : <i class="icon icon-message" />}
                      </span>
                      &nbsp;{csr.CN} &nbsp;
                      <span class="text-secondary">
                        <small>
                          {csr.key.algo}, {csr.key.size}&nbsp;
                          ({idn.csrMetadata.names.map((n0) => (
                            [n0.C, n0.L, n0.O, n0.OU, n0.ST].filter((txt) => txt !== undefined).join(", ")
                          ))})
                        </small>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-1-5">
                    <div className="text-right mb-8">
                      <div className="btn-group btn-group-block">
                        {isCa ? [
                          <button className="btn btn-sm" onClick={() => this.onAddProfile()}>
                            Add Profile
                          </button>,
                          <button className="btn btn-sm" onClick={() => this.onSubmitUpdate()}>
                            Save
                          </button>
                        ] : []}
                        <button class="btn btn-action btn-sm" onClick={() => {
                          window.open(PmApi.v1IdnBundle.replace(v1IdnBundleIdnIdParam, idn.id))
                        }}>
                          <i class="icon icon-download"></i>
                        </button>
                      </div>
                  </div>
                  </div>
                </div>
                <div className="divider" style={{margin: 0}} />
              </div>
              {this.renderIssuerRow()}
              {isCa ? (
                <PmCaProfileList profiles={profiles} onChange={(pr1) => {
                  const ca0: PmIdentity = {...idn}
                  if (pr1.pm_tag === "default") {
                    idn.signingConfig.signing.default = pr1
                  } else {
                    const pr0 = this.nonDefaultProfiles().find((pr) => pr.pm_id === pr1.pm_id)
                    delete ca0.signingConfig.signing.profiles[pr0.pm_tag]
                    ca0.signingConfig.signing.profiles[pr1.pm_tag] = pr1
                  }
                  this.onUpdate(ca0)
                }} onDelete={(pr1) => {
                  const ca0: PmIdentity = {...idn}
                  const pr0 = this.nonDefaultProfiles().find((pr) => pr.pm_id === pr1.pm_id)
                  delete ca0.signingConfig.signing.profiles[pr0.pm_tag]
                  this.onUpdate(ca0)
                }} />
              ) : (
                <div className="mt-16">
                  {csr.hosts.length > 0 ? (
                    <div className="frow">
                      <div className="col-xs-1-5">
                        <label>Hosts</label>
                      </div>
                      <div className="col-xs-4-5">
                        {csr.hosts.map((hn0) => <span class="chip">{hn0}</span>)}
                      </div>
                    </div>
                  ) : <div />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  public render() {
    const {idn: ca} = this.props
    return ca.certificate ? this.renderCaInfoCard() : this.renderCsrEditor()
  }
}
