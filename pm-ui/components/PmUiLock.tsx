import {RenderableProps} from "preact"
import * as React from "react"

import {PmContext, usrMsgClear} from "pm-ui/store"

const PmLockUi = (props: RenderableProps<{}>) => {
  const {state, dispatch: d} = React.useContext(PmContext)
  if (state.lastMessage) {
    alert(JSON.stringify(state.lastMessage, null, 2))
    d(usrMsgClear())
  }
  return (
    <div>
      {props.children}
      {state.uiLocked ? <div className="uiLock" /> : []}
    </div>
  )
}

export default PmLockUi
