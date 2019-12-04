import * as React from "react"

import {SigningProfile} from "pm-schema/signing"
import PmCaProfileCard from "./PmCaProfileCard"

interface PmCaProfileListProps {
  profiles: SigningProfile[]
  onChange: (tp0: SigningProfile) => void
}

export default class PmCaProfileList extends React.Component<PmCaProfileListProps> {
  public render() {
    const tpl = this.props.profiles.sort((pr0, pr1) => pr0.pm_id - pr1.pm_id)
    return (
      <div className="mt-8">
        {tpl.map((tp0) => (
          <div className="accordion">
            <input id={tp0.pm_id.toString()} type="checkbox" name="accordion-checkbox" hidden />
            <label className="accordion-header c-hand" for={tp0.pm_id.toString()}>
              <i class="icon icon-arrow-right mr-1"></i>
              Profile :: {tp0.pm_tag}
            </label>
            <div className="accordion-body">
              <PmCaProfileCard profile={tp0} onChange={(tp1) => this.props.onChange(tp1)} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}
