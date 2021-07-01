import { loadTweets } from "../lookup"

export const createTweet = (newTweet, callback) => {
    lookup("POST", "tweets/create/", callback, {content: newTweet})
  }
  
  export const loadTweets = (callback) => {
  
    lookup("GET", "tweets/", callback)
  
  }