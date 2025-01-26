export const setCookie = (name, value, days) => {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

export const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name + '=') === 0) {
      return c.substring(name.length + 1, c.length)
    }
  }
  return ''
}
