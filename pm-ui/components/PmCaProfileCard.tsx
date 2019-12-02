import * as React from "react"

import {SigningProfile, Usage, UsageValues} from "pm-schema/signing"

interface PmCaProfileCardProps {
  profileName: string
  profile: SigningProfile
  onChange: (pr0: SigningProfile) => void
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
    const {onChange, profile: pr, profileName} = this.props
    return (
      <div className="tile mt-8">
        <div className="tile-icon">{profileName}</div>
        <div className="tile-content">
          <div className="tile-subtitle">
            <div className="frow">
              <div className="col-md-1-3">
                <div className="ml-16">
                  <input className="form-input"
                    type="text" value={pr.expiry} placeholder="Expiry (hrs)"
                    onChange={(e: any) => onChange({...pr, expiry: e.target.value})} />
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
                            <input type="checkbox" checked={checked}
                              onClick={(e: any) => this.onAddUsage(u0, e.target.checked)} />
                            <i class="form-icon"></i> <span onClick={() => this.onAddUsage(u0, !checked)}>{u0}</span>
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
