import * as React from "react"

import {SigningProfile} from "pm-schema/signing"
import PmProfileEditor from "./PmProfileEditor"

interface PmCaProfileListProps {
  profiles: SigningProfile[]
  onChange: (tp0: SigningProfile) => void
  onDelete: (tp0: SigningProfile) => void
}

export default class PmCaProfileList extends React.Component<PmCaProfileListProps> {
  public render() {
    const tpl = this.props.profiles.sort((pr0, pr1) => pr0.pm_id - pr1.pm_id)
    return (
      <div className="mt-16">
        {tpl.map((tp0) => {
          const key = `k${tp0.pm_id}`
          return (
            <div className="accordion">
              <input id={key} type="checkbox" name="accordion-checkbox" hidden />
              <label className="accordion-header c-hand" for={key}>
                <div className="frow">
                  <div className="col-xs-3-4">
                    <i class="icon icon-arrow-right mr-1"></i>
                    Profile: {tp0.pm_tag}
                  </div>
                  <div className="col-xs-1-4">
                    {tp0.pm_tag !== "default" ? (
                      <div className="text-right">
                        <button class="btn btn-action btn-sm mt-3"
                          style={{borderStyle: "none", width: "1em", height: "1em"}}
                          onClick={() => this.props.onDelete(tp0)}>
                          <i class="icon icon-cross"></i>
                        </button>
                      </div>
                    ) : <div />}
                  </div>
                </div>
              </label>
              <div className="accordion-body">
                <PmProfileEditor profile={tp0} onChange={(tp1) => this.props.onChange(tp1)} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
