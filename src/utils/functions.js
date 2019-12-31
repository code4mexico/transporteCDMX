const safeRefFuncCall = (ref, func) => {
  if (ref) {
    ref[func]()
  }
}

const capitalizeString = string => {
  return string.replace(/(?:^|\s)\S/g, letter => letter.toUpperCase())
}

export { safeRefFuncCall, capitalizeString }
