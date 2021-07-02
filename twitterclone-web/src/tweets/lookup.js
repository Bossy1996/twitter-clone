import { lookup } from "../lookup"

export const apiTweetCreate = (newTweet, callback) => {
    lookup("POST", "tweets/create/", callback, {content: newTweet})
  }


export const apiTweetAction = (tweet_id, action,callback) => {
  const data = {id: tweet_id, action: action}
  lookup("POST", "tweets/action/", callback, data)
  }
  
export const apiTweetList = (callback) => {
  
    lookup("GET", "tweets/", callback)
  
  }