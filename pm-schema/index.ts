import {CertificateRequest} from "pm-schema/csr"
import {Config, SigningProfile} from "pm-schema/signing"

export interface PmEncodedCertResponse {
  cert: string
  csr: string
  key: string
  isCa: boolean
}

export interface PmIdentity {
  id: string
  issuerId?: string
  issuerProfileTag?: string
  csrMetadata: CertificateRequest
  certificate?: PmEncodedCertResponse
  signingConfig?: Config
}

export interface PmIdnIndex {
  [id: string]: PmIdentity
}

export interface PmDbSchema {
  idn: PmIdnIndex
}

export const v1IdnBundleIdnIdParam = ":idnId"

export enum PmApi {
  v1Schema = "/v1/schema",
  v1Idn = "/v1/idn",
  v1IdnBundle = "/v1/idn/bundle/:idnId"
}

export const profilesOf = (ca: PmIdentity): SigningProfile[] => {
  const {signing} = ca.signingConfig
  return [
    signing.default,
    ...Object.keys(signing.profiles).map((pk) => signing.profiles[pk])
  ]
}
