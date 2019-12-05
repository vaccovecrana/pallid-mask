import * as React from "react"

import {PmCaIndex, PmCertificateAuthority, PmDbSchema} from "pm-schema"
import {nextInt, profilesOf, uuidV4} from "pm-ui/util"
import {Context} from "preact"

export interface PmUserMessage {
  msg: string
  style: "info" | "error"
}

export interface PmAppState {
  db: PmDbSchema
  uiLocked: boolean,
  lastMessage?: PmUserMessage
}

export type PmDispatch = (action: PmAction) => void

export interface PmStore {
  state: PmAppState
  dispatch: PmDispatch
}

export type PmAction =
  | {type: "lockUi", payload: boolean}
  | {type: "usrMsg", payload: PmUserMessage}
  | {type: "usrMsgClear"}
  | {type: "addCa"}
  | {type: "updCa", payload: PmCertificateAuthority}
  | {type: "delCa", payload: PmCertificateAuthority}
  | {type: "ldSchema", payload: PmDbSchema}

export const lockUi = (locked: boolean): PmAction => ({type: "lockUi", payload: locked})
export const usrInfo = (msg: string): PmAction => ({type: "usrMsg", payload: {msg, style: "info"}})
export const usrError = (msg: string): PmAction => ({type: "usrMsg", payload: {msg, style: "error"}})
export const usrMsgClear = (): PmAction => ({type: "usrMsgClear"})

export const addCa = (): PmAction => ({type: "addCa"})
export const updCa = (ca: PmCertificateAuthority): PmAction => ({type: "updCa", payload: ca})
export const delCa = (ca: PmCertificateAuthority): PmAction => ({type: "delCa", payload: ca})
export const ldSchema = (db: PmDbSchema): PmAction => ({type: "ldSchema", payload: db})

export const pmReducer: React.Reducer<PmAppState, PmAction> = (state0: PmAppState, action: PmAction): PmAppState => {
  switch (action.type) {
    case "usrMsg": return {...state0, lastMessage: action.payload}
    case "usrMsgClear": return {...state0, lastMessage: undefined}
    case "lockUi": return {...state0, uiLocked: action.payload}
    case "addCa":
      const ca0: PmCertificateAuthority = {
        id: uuidV4(),
        csrMetadata: {
          CN: "", names: [{}], hosts: [],
          key: {algo: undefined, size: undefined},
        },
        signingConfig: {
          signing: {
            default: {
              pm_id: nextInt(), pm_tag: "default",
              usages: [], ca_constraint: {is_ca: false}
            }, profiles: {}
          }
        }
      }
      return {...state0, db: {...state0.db, cas: {...state0.db.cas, [ca0.id]: ca0}}}
    case "delCa":
      const cas0: PmCaIndex = {...state0.db.cas}
      delete cas0[action.payload.id]
      return {...state0, db: {...state0.db, cas: cas0}}
    case "updCa": return {...state0,
      db: {...state0.db, cas: {...state0.db.cas, [action.payload.id]: action.payload}}
    }
    case "ldSchema":
      Object.keys(action.payload.cas).map((pk) => action.payload.cas[pk])
        .flatMap((ca) => profilesOf(ca)).forEach((pr) => { pr.pm_id = nextInt() })
      return {...state0, db: action.payload}
  }
  return state0
}

export const PmContext: Context<PmStore> = React.createContext(undefined)
