export interface  AuthRemote {
  remote: string
  auth_key: string
}

export interface AuthKey {
  type: string
  key: string
}

export interface AuthKeyIndex {
  [id: string]: AuthKey
}

export interface StringIndex {
  [id: string]: string
}

export enum Usage {
  signing = "signing",
  digital_signature = "digital signature",
  content_commitment = "content commitment",
  key_encipherment = "key encipherment",
  key_agreement = "key agreement",
  data_encipherment = "data encipherment",
  cert_sign = "cert sign",
  crl_sign = "crl sign",
  encipher_only = "encipher only",
  decipher_only = "decipher only"
}

export const UsageValues: Usage[] = [
  Usage.signing, Usage.digital_signature, Usage.content_commitment,
  Usage.key_encipherment, Usage.key_agreement, Usage.data_encipherment,
  Usage.cert_sign, Usage.crl_sign, Usage.encipher_only, Usage.decipher_only
]

export interface CAConstraint {
  is_ca: boolean
  max_path_len?: number
  max_path_len_zero?: boolean
}

export interface SigningProfile {
  pm_id: number
  pm_tag: string
  usages: Usage[]
  issuer_urls?: string[]
  ocsp_url?: string
  crl_url?: string
  ca_constraint: CAConstraint
  ocsp_no_check?: boolean
  expiry?: string
  backdate?: string
  auth_key?: string
  prev_auth_key?: string
  remote?: string
  not_before?: string
  not_after?: string
  name_whitelist?: string
  auth_remote?: AuthRemote
  ct_log_servers?: string[]
  allowed_extensions?: string[]
  cert_store?: string
}

export interface SigningProfileIndex {
  [id: string]: SigningProfile
}

export interface Signing {
  profiles?: SigningProfileIndex
  default: SigningProfile
}

export interface Config {
  signing: Signing
  auth_keys?: AuthKeyIndex
  // TODO missing OCSP support :(
  remotes?: StringIndex
}
