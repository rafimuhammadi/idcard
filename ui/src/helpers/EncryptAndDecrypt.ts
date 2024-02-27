export const encryptId = (id: any) => {
  const randomString =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return btoa(randomString + '-' + btoa(id.toString()))
}

export const decryptId = (id: any) => {
  const decodedX = atob(id)
  const x = decodedX.split('-')[1]
  const decodedValue = atob(x)
  return decodedValue
}
