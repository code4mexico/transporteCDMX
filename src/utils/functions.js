const safeRefFuncCall = (ref, func) => {
  if (ref) {
    ref[func]()
  }
}

export { safeRefFuncCall }
