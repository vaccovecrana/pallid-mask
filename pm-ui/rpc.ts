import {lockUi, PmDispatch, usrError} from "pm-ui/store"

export const postJsonIo = <T>(url: string, data: any, d: PmDispatch): Promise<T> => {
  const payload = JSON.stringify(data)
  return fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: payload})
    .then((response) => Promise.all([Promise.resolve(response), response.json()]))
    .then((pArr) => {
      if (!pArr[0].ok) { throw pArr[1] }
      return pArr[1]
    })
    .then((rData) => rData as T)
    .catch((err) => {
      d(usrError(err))
      throw err
    }).finally(() => d(lockUi(false)))
}
