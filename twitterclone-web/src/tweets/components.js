import React from 'react';
import {useEffect, useState} from 'react';

import { apiTweetAction ,apiTweetCreate ,apiTweetList } from './lookup';

export function TweetsComponent(props) {
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault()
        const new_value = textAreaRef.current.value
        console.log(new_value)
        let tempNewTweets = [...newTweets]
        apiTweetCreate(new_value, (response, status) => {
          console.log(response, status)
          if (status === 201) {
            tempNewTweets.unshift(response)
            setNewTweets(tempNewTweets)
          } else {
            alert("An error ocurred please try again")
          }
          
        })
        
        
        
        textAreaRef.current.value = ''

    }
    return <div className={props.className}>
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        <TweetsList newTweets={newTweets}/>
    </div>
}

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets: []);
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    // setTweetsInit([...props.newTweets].concat(tweetsInit))
    useEffect(() => {
        let final = [...props.newTweets,].concat(tweetsInit)
        if (final.length !== tweets.length) {
            setTweets(final)  
        }
                 
    }, [props.newTweets, tweetsInit, tweets])
    useEffect(() => {
      if (tweetsDidSet === false) {
        // do my lookup
        const myCallback = (response, status) => {
          console.log(response, status)
          if (status === 200) {
              const finalTweetsInit = [...response].concat(tweetsInit)
            setTweetsInit(finalTweetsInit) 
            setTweetsDidSet(true)
          } else {
            alert("There was an error")
          }
        }
        apiTweetList(myCallback)
  }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet])
    return tweets.map((item, index) => {
      return <Tweet tweet={item} className='my-5 py-5 boder bg-white text-dark' key={`${index}-{item.id}`} />
    })
  }

export function ActionBtn(props){
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes: 0)
    // const [userLike, setUserlike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className: 'btn btn-small btn-primary'
    const actionDisplay = action.display ? action.display: 'Action'
    
    const handleActionBackendEvent = (response, status) => {
      console.log(status, response)
      if (status === 200) {
        setLikes(response.likes)
      }
      /* if (action.type === 'like') {
        if (userLike === true) {
            setLikes(likes - 1)
            setUserlike(false)
        } else {
            setLikes(tweet.like+1)
            setUserlike(true)
        }
    } */
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleActionBackendEvent)  
        }
    }
    const display = action.type === "like" ? `${likes} ${actionDisplay}`: actionDisplay
    return <buttom className={className} onClick={handleClick} >{display}</buttom>
  }
  
export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className: 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <div>
          <p> {tweet.id} - {tweet.content}</p>
          {tweet.parent && <div><Tweet tweet={tweet.parent} /></div>}
        </div>
      <div className='btn btn-primary'>
        <ActionBtn tweet={tweet} action={{type: 'like', display: 'Likes'}}/>
        <ActionBtn tweet={tweet} action={{type: 'unlike', display: 'UnLikes'}}/>
        <ActionBtn tweet={tweet} action={{type: 'retweet', display: 'Retweet'}}/>
      </div>
    </div>
  }