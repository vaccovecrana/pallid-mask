const dec2hex: string[] = []
for (let i = 0; i <= 15; i++) { dec2hex[i] = i.toString(16) }

export const uuidV4 = (): string => {
  let uuid = ""
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += "-"
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += dec2hex[(Math.random() * 4 | 0 + 8)]
    } else {
      uuid += dec2hex[(Math.random() * 16 | 0)]
    }
  }
  return uuid
}

let i0 = 0

export const nextInt = () => {
  i0 = i0 + 1
  return i0
}
