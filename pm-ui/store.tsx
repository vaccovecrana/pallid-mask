import * as React from "react"

import {PmCertificateAuthority, PmDbSchema} from "pm-schema"
import {uuidV4} from "pm-ui/util"
import {Context} from "preact"

export type PmAction =
  | {type: "addCa"}
  | {type: "delCa", payload: PmCertificateAuthority}

export const pmReducer: React.Reducer<PmDbSchema, PmAction> = (state0: PmDbSchema, action: PmAction): PmDbSchema => {
  if (action.type === "addCa") {
    return {...state0,
      cas: [...state0.cas, {id: uuidV4(), csrMetadata: {CN: "", names: [], hosts: []}}]
    }
  }
  return state0
}

export interface PmStore {
  state: PmDbSchema
  dispatch: (action: PmAction) => void
}

export const PmContext: Context<PmStore> = React.createContext(undefined)
