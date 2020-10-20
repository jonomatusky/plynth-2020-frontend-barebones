import axios from 'axios'

const { REACT_APP_BACKEND_URL } = process.env

const token = localStorage.getItem('__USER_TOKEN')

export const request = async ({ cancelToken, url, ...config }) => {
  let headers = config.headers || {}

  console.log(config.data)

  console.log(token)

  let message

  if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }
    url = REACT_APP_BACKEND_URL.concat(url)
  } else if (url.search('amazonaws') !== -1) {
    message = 'Unable to upload image. Please try again.'
  }

  console.log(headers)

  console.log(url)

  try {
    const response = await axios.request({
      ...config,
      url,
      headers,
      cancelToken,
      timeout: 10000,
    })

    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)

    if (axios.isCancel(err)) {
      console.log('Request canceled: ', err.message)
      return
    } else if (err.request) {
      console.log(err.request)
      throw new Error(
        'Unable to connect to server. Please check your internet connection.'
      )
    } else if (message) {
      throw new Error(message)
    } else if ((err.response.data || {}).message) {
      console.log(err.response.data.message)
      throw new Error(err.response.data.message)
    } else {
      console.log('Error', err.message)
      return
    }
  }
}
