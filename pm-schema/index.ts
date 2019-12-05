import {CertificateRequest} from "pm-schema/csr"
import {Config} from "pm-schema/signing"

export interface PmEncodedCertResponse {
  cert: string
  csr: string
  key: string
}

export interface PmCertificateAuthority {
  id: string
  issuerId?: string
  issuerProfileTag?: string
  csrMetadata: CertificateRequest
  certificate?: PmEncodedCertResponse
  signingConfig?: Config
}

export interface PmCaIndex {
  [id: string]: PmCertificateAuthority
}

export interface PmDbSchema {
  cas: PmCaIndex
}

export enum PmApi {
  v1Schema = "/v1/schema",
  v1Ca = "/v1/ca"
}
