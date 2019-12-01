import * as React from "react"

import {CertificateRequest} from "pm-schema/csr"

interface PmCsrEditorProps {
  csr: CertificateRequest
  onChange: (csr: CertificateRequest) => void
  onSubmit: () => void
}

export default class PmCsrEditor extends React.Component<PmCsrEditorProps> {

  public render() {
    const {csr, onSubmit, onChange: onUpdate} = this.props
    return (
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title mb-15">
                <div className="input-group mx-5">
                  <input className="form-input" type="text" value={csr.CN} placeholder="Common Name"
                    onChange={(e: any) => onUpdate({...csr, CN: e.target.value})} />
                </div>
              </div>
              <div className="tile-subtitle">
                <div className="frow">
                  <div className="col-md-1-3">
                    <div className="input-group mx-5">
                      <input className="form-input" type="text" value={csr.key.algo} placeholder="Key algo"
                        onChange={(e: any) => onUpdate({...csr, key: {...csr.key, algo: e.target.value}})} />
                      <input className="form-input" type="number" value={csr.key.size} placeholder="Key size"
                        onChange={(e: any) => onUpdate({...csr,
                          key: {...csr.key, size: parseInt(e.target.value, 10)}
                        })} />
                    </div>
                  </div>
                  <div className="col-md-2-3">
                    <div className="input-group input-inline mx-5">
                      <input className="form-input" type="text" value={csr.names[0].C} placeholder="Country"
                        onChange={(e: any) => onUpdate({...csr, names: [{...csr.names[0], C: e.target.value}]})} />
                      <input className="form-input" type="text" value={csr.names[0].L} placeholder="Locality"
                        onChange={(e: any) => onUpdate({...csr, names: [{...csr.names[0], L: e.target.value}]})} />
                      <input className="form-input" type="text" value={csr.names[0].O} placeholder="Organization"
                        onChange={(e: any) => onUpdate({...csr, names: [{...csr.names[0], O: e.target.value}]})} />
                      <input className="form-input" type="text" value={csr.names[0].OU} placeholder="Org Unit"
                        onChange={(e: any) => onUpdate({...csr, names: [{...csr.names[0], OU: e.target.value}]})} />
                      <input className="form-input" type="text" value={csr.names[0].ST} placeholder="State"
                        onChange={(e: any) => onUpdate({...csr, names: [{...csr.names[0], ST: e.target.value}]})} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile-action">
              <button className="btn btn-primary" onClick={() => onSubmit()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
