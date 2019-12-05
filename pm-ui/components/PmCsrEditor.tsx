import * as React from "react"

import {PmCertificateAuthority} from "pm-schema"
import {CertificateRequest} from "pm-schema/csr"
import { profilesOf } from "pm-ui/util"

interface PmCsrEditorProps {
  csr: CertificateRequest
  signingCas: PmCertificateAuthority[]
  onChange: (csr: CertificateRequest) => void
  onDelete: () => void
  onSubmit: () => void
}

export default class PmCsrEditor extends React.Component<PmCsrEditorProps> {

  public render() {
    const {csr, signingCas: sca, onDelete, onSubmit, onChange: onUpdate} = this.props
    return (
      <div className="card">
        <div className="card-body">
          <div className="tile">
            <div className="tile-content">
              <div className="tile-title mb-15">
                <div className="frow">
                  <div className="col-xs-1-3">
                    <div className="mx-5">
                      <input className="form-input" type="text" value={csr.CN} placeholder="Common Name"
                        onChange={(e: any) => onUpdate({...csr, CN: e.target.value})} />
                    </div>
                  </div>
                  <div className="col-xs-2-3">
                    <div className="mx-5">
                      <select class="form-select">
                        <option>Issuer/Profile</option>
                        {sca.flatMap((ca0) => profilesOf(ca0).map((pr0) => ({ca: ca0, pr: pr0}))).map((arr0) => (
                          <option value={arr0.pr.pm_id}>
                            {arr0.ca.csrMetadata.CN}/{arr0.pr.pm_tag}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
              <div className="frow">
                <div className="col-xs-1-1">
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={() => onSubmit()}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
              <div className="frow">
                <div className="col-xs-1-1">
                  <div className="text-center">
                    <button class="btn btn-action btn-sm s-circle mt-16" onClick={() => onDelete()}>
                      <i class="icon icon-cross"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
