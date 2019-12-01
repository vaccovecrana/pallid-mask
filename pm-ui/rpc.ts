import {lockUi, PmDispatch, usrError} from "pm-ui/store"

const onJsonResponse = <T>(response: Response, d: PmDispatch): Promise<T> => {
  return response.json()
    .then((jData) => {
      if (!response.ok) { throw jData }
      return jData as T
    }).catch((err) => {
      d(usrError(err))
      throw err
    }).finally(() => d(lockUi(false)))
}

export const getJson = <T>(url: string, d: PmDispatch): Promise<T> => {
  return fetch(url).then((response) => onJsonResponse(response, d))
}

export const postJsonIo = <T>(url: string, data: any, d: PmDispatch): Promise<T> => {
  const payload = JSON.stringify(data)
  return fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: payload})
    .then((response) => onJsonResponse(response, d))
}
