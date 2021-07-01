import { lookup } from "../lookup"

export const apiTweetCreate = (newTweet, callback) => {
    lookup("POST", "tweets/create/", callback, {content: newTweet})
  }
  
  export const apiTweetList = (callback) => {
  
    lookup("GET", "tweets/", callback)
  
  }