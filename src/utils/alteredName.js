export const alteredName = (name) => {
  if (name.includes(' ')) {
    return name.replace(/ /g, '_')
  } else {
    return name.replace(/_/g, ' ')
  }
}
