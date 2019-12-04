import * as React from "react"

import {PmApi, PmCertificateAuthority} from "pm-schema"
import {postJsonIo} from "pm-ui/rpc"
import {lockUi, PmContext, updCa} from "pm-ui/store"
import {nextInt} from "pm-ui/util"
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

  public nonDefaultProfilesOf(ca: PmCertificateAuthority) {
    const {signing} = ca.signingConfig
    return Object.keys(signing.profiles)
      .filter((pk) => pk !== "default")
      .map((pk) => signing.profiles[pk])
  }

  public renderCaInfoCard(ca: PmCertificateAuthority) {
    const cm = ca.csrMetadata
    const {signing} = ca.signingConfig
    const profiles = [signing.default, ...this.nonDefaultProfilesOf(ca)]
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
                                  new: {
                                    pm_id: nextInt(), pm_tag: "new",
                                    usages: [], ca_constraint: {is_ca: false}
                                  }
                                }
                              }
                            }
                          })
                        }}> Add Profile
                        </button>
                        <button className="btn btn-primary btn-sm">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" style={{margin: 0}} />
              </div>
              <PmCaProfileList profiles={profiles} onChange={(pr1) => {
                const ca0: PmCertificateAuthority = {...ca}
                if (pr1.pm_tag === "default") {
                  ca.signingConfig.signing.default = pr1
                } else {
                  const pr0 = this.nonDefaultProfilesOf(ca).find((pr) => pr.pm_id === pr1.pm_id)
                  delete ca0.signingConfig.signing.profiles[pr0.pm_tag]
                  ca0.signingConfig.signing.profiles[pr1.pm_tag] = pr1
                }
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
