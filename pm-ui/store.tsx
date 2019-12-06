import * as React from "react"

import {PmDbSchema, PmIdentity, PmIdnIndex, profilesOf} from "pm-schema"
import {nextInt, uuidV4} from "pm-ui/util"
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
  | {type: "addIdn"}
  | {type: "updIdn", payload: PmIdentity}
  | {type: "delIdn", payload: PmIdentity}
  | {type: "ldSchema", payload: PmDbSchema}

export const lockUi = (locked: boolean): PmAction => ({type: "lockUi", payload: locked})
export const usrInfo = (msg: string): PmAction => ({type: "usrMsg", payload: {msg, style: "info"}})
export const usrError = (msg: string): PmAction => ({type: "usrMsg", payload: {msg, style: "error"}})
export const usrMsgClear = (): PmAction => ({type: "usrMsgClear"})

export const addIdn = (): PmAction => ({type: "addIdn"})
export const updIdn = (idn: PmIdentity): PmAction => ({type: "updIdn", payload: idn})
export const delIdn = (idn: PmIdentity): PmAction => ({type: "delIdn", payload: idn})
export const ldSchema = (db: PmDbSchema): PmAction => ({type: "ldSchema", payload: db})

export const pmReducer: React.Reducer<PmAppState, PmAction> = (state0: PmAppState, action: PmAction): PmAppState => {
  switch (action.type) {
    case "usrMsg": return {...state0, lastMessage: action.payload}
    case "usrMsgClear": return {...state0, lastMessage: undefined}
    case "lockUi": return {...state0, uiLocked: action.payload}
    case "addIdn":
      const ca0: PmIdentity = {
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
      return {...state0, db: {...state0.db, idn: {...state0.db.idn, [ca0.id]: ca0}}}
    case "delIdn":
      const idn0: PmIdnIndex = {...state0.db.idn}
      delete idn0[action.payload.id]
      return {...state0, db: {...state0.db, idn: idn0}}
    case "updIdn": return {...state0,
      db: {...state0.db, idn: {...state0.db.idn, [action.payload.id]: action.payload}}
    }
    case "ldSchema":
      Object.keys(action.payload.idn).map((pk) => action.payload.idn[pk])
        .flatMap((ca) => profilesOf(ca)).forEach((pr) => { pr.pm_id = nextInt() })
      return {...state0, db: action.payload}
  }
  return state0
}

export const PmContext: Context<PmStore> = React.createContext(undefined)
