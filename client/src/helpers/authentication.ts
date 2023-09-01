export function isAuthenticated() {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    return true
  }
  return false
}

export function checkForJwtToken() {
  const token = localStorage.getItem('jwtToken')

  if (!token) {
    throw new Error('JWT token not found')
  }
  return token
}
