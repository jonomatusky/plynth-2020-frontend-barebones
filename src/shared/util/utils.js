const httpRequest = async (
  url,
  method = 'GET',
  body = null,
  headers = {},
  json = true
) => {
  const httpAbortCtrl = new AbortController()
  activeHttpRequests.current.push(httpAbortCtrl)

  const response = await fetch(url, {
    method,
    body,
    headers,
    signal: httpAbortCtrl.signal,
  })

  activeHttpRequests.current = activeHttpRequests.current.filter(
    reqCtrl => reqCtrl !== httpAbortCtrl
  )

  let data

  if (json) {
    data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }
  } else {
    data = response
    if (!response.ok) {
      throw new Error('Problem fulfilling HTTP request')
    }
  }
}
