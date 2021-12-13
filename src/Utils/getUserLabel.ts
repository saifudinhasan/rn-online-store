const getUserLabel = (email: string): string => {
  const emailUser: string[] = email.split('@')
  const username = emailUser[0]
  const splitUsername: string[] = username.split('.')
  // somename@email.com -> SO
  if (splitUsername.length === 1) {
    return `${username[0]}${username[1]}`.toUpperCase()
  }
  // some.name@email.com -> SN
  return `${splitUsername[0][0]}${splitUsername[1][0]}`.toUpperCase()
}

export default getUserLabel
