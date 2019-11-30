import * as React from "react"

import {PmCertificateAuthority, PmDbSchema} from "pm-schema"
import {uuidV4} from "pm-ui/util"
import {Context} from "preact"

export type PmAction =
  | {type: "addCa"}
  | {type: "updCa", payload: PmCertificateAuthority}
  | {type: "delCa", payload: PmCertificateAuthority}

export const updCa = (ca: PmCertificateAuthority): PmAction => ({type: "updCa", payload: ca})
export const delCa = (ca: PmCertificateAuthority): PmAction => ({type: "delCa", payload: ca})

export const pmReducer: React.Reducer<PmDbSchema, PmAction> = (state0: PmDbSchema, action: PmAction): PmDbSchema => {
  if (action.type === "addCa") {
    const ca0: PmCertificateAuthority = {
      id: uuidV4(), csrMetadata: {
        CN: "", names: [{}], hosts: [],
        key: {algo: undefined, size: undefined}
      }
    }
    return {...state0, cas: {...state0.cas, [ca0.id]: ca0}}
  } else if (action.type === "updCa") {
    return {...state0, cas: {...state0.cas, [action.payload.id]: action.payload}}
  }
  return state0
}

export interface PmStore {
  state: PmDbSchema
  dispatch: (action: PmAction) => void
}

export const PmContext: Context<PmStore> = React.createContext(undefined)
