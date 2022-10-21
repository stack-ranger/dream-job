export const checkValidEmail = (email:string) => String(email)
.toLowerCase()
.match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export const checkEmailLength = (email:string) => {
  return email.length > 6
}

export const checkPasswordLength = (password:string) => {
  return password.length > 6 
}