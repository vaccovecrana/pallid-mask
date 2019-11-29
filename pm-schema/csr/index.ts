export interface Name {
  C?: string
  ST?: string
  L?: string
  O?: string
  OU?: string
  SerialNumber?: string
}

export interface KeyRequest {
  algo: string
  size: number
}

export interface CAConfig {
  pathlen: number
  pathlenzero: boolean
  expiry: string
  backdate: string
}

export interface CertificateRequest {
  CN: string
  names: Name[]
  hosts: string[]
  key?: KeyRequest
  ca?: CAConfig
  serialnumber?: string
}
