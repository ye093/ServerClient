// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('ye-pro-authority') || 'USER';
}

export function setAuthority(authority) {
  return localStorage.setItem('ye-pro-authority', authority);
}
