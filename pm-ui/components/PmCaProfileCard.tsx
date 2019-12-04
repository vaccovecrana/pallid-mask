import * as React from "react"

import {SigningProfile, Usage, UsageValues} from "pm-schema/signing"

interface PmCaProfileCardProps {
  profile: SigningProfile
  onChange: (pr0: SigningProfile) => void
}

export default class PmCaProfileCard extends React.Component<PmCaProfileCardProps> {

  public onSetUsage(u: Usage, doAdd: boolean) {
    const pr0 = this.props.profile
    if (doAdd) {
      this.props.onChange({...pr0, usages: [...pr0.usages, u]})
    } else {
      this.props.onChange({...pr0, usages: pr0.usages.filter((u0) => u0 !== u)})
    }
  }

  public render() {
    const {onChange, profile: tp} = this.props
    return (
      <div className="tile mt-8">
        <div className="tile-content">
          <div className="tile-subtitle">
            <div className="frow">
              <div className="col-md-1-3">
                <div className="ml-16">
                  <div className="input-group mx-5">
                    <input className="form-input" type="text" disabled={tp.pm_tag === "default"}
                      value={tp.pm_tag} placeholder="Profile Name"
                      onChange={(e: any) => {
                        const pt = e.target.value
                        if (pt !== "") { onChange({...tp, pm_tag: pt}) }
                      }} />
                    <input className="form-input"
                      type="text" value={tp.expiry} placeholder="Expiry (hrs)"
                      onChange={(e: any) => onChange({...tp, expiry: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="col-md-2-3">
                <div className="ml-16">
                  <div className="frow">
                    {UsageValues.map((u0) => {
                      const checked = tp.usages.find((u1) => u1 === u0) !== undefined
                      return (
                        <div className="col-xs-1-2">
                          <div className="mx-5">
                            <label class="form-checkbox">
                              <input type="checkbox" checked={checked}
                                onClick={() => this.onSetUsage(u0, !checked)} />
                              <i class="form-icon"></i> {u0}
                            </label>
                          </div>
                        </div>
                      )
                    })}
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
