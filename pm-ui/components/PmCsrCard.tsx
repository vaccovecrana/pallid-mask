import * as React from "react"

import {PmApi, PmCertificateAuthority} from "pm-schema"
import {SigningProfile} from "pm-schema/signing"
import {postJsonIo} from "pm-ui/rpc"
import {lockUi, PmContext, updCa} from "pm-ui/store"
import PmCaProfileList from "./PmCaProfileList"
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
    const sConf = ca.signingConfig.signing
    const profIdx = new Map<string, SigningProfile>()
    profIdx.set("default", sConf.default)
    Object.keys(sConf.profiles || {}).forEach((pk) => {
      profIdx.set(pk, sConf.profiles[pk])
    })
    return (
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title">
                <div className="frow">
                  <div className="col-xs-3-4">
                    {cm.CN} ::&nbsp;
                    <small>
                      {cm.key.algo}, {cm.key.size}&nbsp;
                      ({ca.csrMetadata.names.map((n0) => (
                        [n0.C, n0.L, n0.O, n0.OU, n0.ST].filter((txt) => txt !== undefined).join(", ")
                      ))})
                    </small>
                  </div>
                  <div className="col-xs-1-4">
                    <div className="text-right mb-8">
                      <div className="btn-group btn-group-block">
                        <button className="btn btn-primary btn-sm" onClick={() => {
                          this.onUpdate({...ca,
                            signingConfig: {...ca.signingConfig,
                              signing: {...ca.signingConfig.signing,
                                profiles: {...ca.signingConfig.signing.profiles,
                                  new: {usages: [], ca_constraint: {is_ca: false}}
                                }
                              }
                            }
                          })
                        }}>
                          Add Profile
                        </button>
                        <button className="btn btn-primary btn-sm">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" style={{margin: 0}} />
              </div>
              <PmCaProfileList profiles={profIdx} onChange={(prIdx0) => {
                const ca0: PmCertificateAuthority = {...ca}
                ca0.signingConfig.signing.default = prIdx0.get("default")
                ca0.signingConfig.signing.profiles = {}
                const profiles = [...prIdx0.keys()].filter((pk) => pk !== "default")
                profiles.forEach((pk) => {
                  ca0.signingConfig.signing.profiles[pk] = prIdx0.get(pk)
                })
                this.onUpdate(ca0)
              }} />
            </div>
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
