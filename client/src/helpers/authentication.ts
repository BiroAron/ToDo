export default function isAuthenticated() {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    return true
  }
  return false
}
