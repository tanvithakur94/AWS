export const containsUppercase = (value) => {
  return /[A-Z]/.test(value)
}
export const containsLowercase = (value) => {
   return /[a-z]/.test(value)
}
export const containsNumber = (value) => {
    return /[0-9]/.test(value)
}
export const containsSpecial = (value) => {
    return /[#?!@$%^&*-]/.test(value)
}
export const validPhoneNumber = (value) => {
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value);
}
export const validMonth = (value) => {
    return /^([1-9]|1[012])$/.test(value);
}
export const validDay = (value) => {
    return /\b(0?[1-9]|[1-9][0-9]|100)\b/.test(value);
}
export const validYear = (value) => {
    return /^\d{4}$/.test(value);
}
export const validPassword = (value) => {
    return containsUppercase(value) && containsLowercase(value) && containsNumber(value)
}

export const validEmail = (value) => {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);
}