import * as React from "react"

import {PmApi, PmCertificateAuthority} from "pm-schema"
import {postJsonIo} from "pm-ui/rpc"
import {lockUi, PmContext, updCa} from "pm-ui/store"

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
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title mb-15">
                <div className="input-group mx-5">
                  <input className="form-input" type="text" value={ca.csrMetadata.CN} placeholder="Common Name"
                    onChange={(e: any) => this.onUpdate({...ca,
                      csrMetadata: {...ca.csrMetadata, CN: e.target.value}
                    })} />
                </div>
              </div>
              <div className="tile-subtitle">
                <div className="frow">
                  <div className="col-md-1-3">
                    <div className="input-group mx-5">
                      <input className="form-input" type="text" value={ca.csrMetadata.key.algo} placeholder="Key algo"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, key: {...ca.csrMetadata.key, algo: e.target.value}}
                        })} />
                      <input className="form-input" type="number" value={ca.csrMetadata.key.size} placeholder="Key size"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata,
                            key: {...ca.csrMetadata.key, size: parseInt(e.target.value, 10)}
                          }
                        })} />
                    </div>
                  </div>
                  <div className="col-md-2-3">
                    <div className="input-group input-inline mx-5">
                      <input className="form-input" type="text" value={ca.csrMetadata.names[0].C} placeholder="Country"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, names: [{...ca.csrMetadata.names[0], C: e.target.value}]}
                        })} />
                      <input className="form-input" type="text" value={ca.csrMetadata.names[0].L} placeholder="Locality"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, names: [{...ca.csrMetadata.names[0], L: e.target.value}]}
                        })} />
                      <input className="form-input" type="text" value={ca.csrMetadata.names[0].O} placeholder="Organization"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, names: [{...ca.csrMetadata.names[0], O: e.target.value}]}
                        })} />
                      <input className="form-input" type="text" value={ca.csrMetadata.names[0].OU} placeholder="Org Unit"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, names: [{...ca.csrMetadata.names[0], OU: e.target.value}]}
                        })} />
                      <input className="form-input" type="text" value={ca.csrMetadata.names[0].ST} placeholder="State"
                        onChange={(e: any) => this.onUpdate({...ca,
                          csrMetadata: {...ca.csrMetadata, names: [{...ca.csrMetadata.names[0], ST: e.target.value}]}
                        })} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile-action">
              <button className="btn btn-primary" onClick={() => this.onSubmit()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
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
              <div className="tile-subtitle">

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
