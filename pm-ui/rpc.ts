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

const doRequest = <T>(url: string, data: any, d: PmDispatch, init: RequestInit): Promise<T> => {
  const payload = JSON.stringify(data)
  return fetch(url, {
    ...init, body: payload,
    headers: {"Content-Type": "application/json"}
  }).then((response) => onJsonResponse(response, d))
}

export const postJsonIo = <T>(url: string, data: any, d: PmDispatch): Promise<T> =>
  doRequest(url, data, d, {method: "POST"})

export const putJsonIo = <T>(url: string, data: any, d: PmDispatch): Promise<T> =>
  doRequest(url, data, d, {method: "PUT"})
