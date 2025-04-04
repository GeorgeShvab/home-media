const getQueryPath = (endpoint: string, ...params: string[]) => {
  const splitedEndpoint = endpoint.split(/\\|\//)

  let i = 0

  const finalPath = splitedEndpoint.map((item) => {
    if (item.charAt(0) === ':') {
      i++
      return params[i - 1]
    }

    return item
  })

  return finalPath.join('/')
}

export default getQueryPath
