export const loadTweets = (callback) => {
    const xhr = new XMLHttpRequest()
    const mehotd = 'GET'
    const url = "http://localhost:8000/api/tweets"
    const responseType = "json"
    xhr.responseType = responseType
    xhr.open(mehotd, url)
    xhr.onload = () => {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (error) {
      console.log(error)
      callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
  }