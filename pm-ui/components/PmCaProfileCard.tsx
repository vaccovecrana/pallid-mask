import * as React from "react"

import {SigningProfile, Usage, UsageValues} from "pm-schema/signing"

interface PmCaProfileCardProps {
  profileName: string
  profile: SigningProfile
  onChange: (pr0: SigningProfile) => void
  onChangeName: (profileName: string) => void
}

export default class PmCaProfileCard extends React.Component<PmCaProfileCardProps> {

  public onAddUsage(u: Usage, doAdd: boolean) {
    const pr0 = this.props.profile
    if (doAdd) {
      this.props.onChange({...pr0, usages: [...pr0.usages, u]})
    } else {
      this.props.onChange({...pr0, usages: pr0.usages.filter((u0) => u0 !== u)})
    }
  }

  public render() {
    const {onChange, onChangeName, profile: pr, profileName} = this.props
    return (
      <div className="tile mt-8">
        <div className="tile-content">
          <div className="tile-subtitle">
            <div className="frow">
              <div className="col-md-1-3">
                <div className="ml-16">
                  <div className="input-group mx-5">
                    <input className="form-input" type="text"
                      value={profileName} placeholder="Profile Name"
                      onChange={(e: any) => {
                        const label = e.target.value
                        if (label !== "") { onChangeName(label) }
                      }} />
                    <input className="form-input"
                      type="text" value={pr.expiry} placeholder="Expiry (hrs)"
                      onChange={(e: any) => onChange({...pr, expiry: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="col-md-2-3">
                <div className="ml-16">
                  <div className="frow">
                    {UsageValues.map((u0) => {
                      const checked = pr.usages.find((u1) => u1 === u0) !== undefined
                      return (
                        <div className="col-xs-1-2">
                          <div className="mx-5">
                            <label class="form-checkbox">
                              <input type="checkbox" checked={checked}
                                onClick={() => this.onAddUsage(u0, !checked)} />
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
