import * as React from "react"

import {SigningProfile} from "pm-schema/signing"
import {uuidV4} from "pm-ui/util"
import PmCaProfileCard from "./PmCaProfileCard"

interface PmCaProfileListProps {
  profiles: Map<string, SigningProfile>
  onChange: (profiles: Map<string, SigningProfile>) => void
}

export default class PmCaProfileList extends React.Component<PmCaProfileListProps> {
  public render() {
    const prIdx = this.props.profiles
    const prKeys = [...prIdx.keys()].filter((pk) => pk !== "")
    return (
      <div className="mt-8">
        {prKeys.map((prk) => {
          const uid = uuidV4()
          return (
            <div className="accordion">
              <input id={uid} type="checkbox" name="accordion-checkbox" hidden />
              <label className="accordion-header c-hand" for={uid}>
                <i class="icon icon-arrow-right mr-1"></i>
                Profile :: {prk}
              </label>
              <div className="accordion-body">
                <PmCaProfileCard profile={prIdx.get(prk)} profileName={prk}
                  onChange={(pr0) => {
                    const idx0 = new Map<string, SigningProfile>(prIdx)
                    idx0.set(prk, pr0)
                    this.props.onChange(idx0)
                  }} onChangeName={(pName) => {
                    const idx0 = new Map<string, SigningProfile>(prIdx)
                    const pr0 = idx0.get(prk)
                    idx0.delete(prk)
                    idx0.set(pName, pr0)
                    this.props.onChange(idx0)
                  }} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
