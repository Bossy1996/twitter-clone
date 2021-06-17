import React from 'react';
import {useEffect, useState} from 'react';

import { loadTweets } from '../lookup';
  
export function TweetsList(props) {
    const [tweets, setTweets] = useState([]);
      
    useEffect(() => {
     // do my lookup
     const myCallback = (response, status) => {
       console.log(response, status)
       if (status === 200) {
        setTweets(response) 
       } else {
         alert("There was an error")
       }
    }
     loadTweets(myCallback)
    }, [])
    return tweets.map((item, index) => {
      return <Tweet tweet={item} className='my-5 py-5 boder bg-white text-dark' key={`${index}-{item.id}`} />
    })
  }

export function ActionBtn(props){
    const {tweet, action} = props
    const className = props.className ? props.className: 'btn btn-small btn-primary'
    return action.type === 'like' ? <buttom className={className} >{tweet.likes} Like</buttom>: null
  }
  
export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className: 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p> {tweet.id} - {tweet.content}</p>
      <div className='btn btn-primary'>
        <ActionBtn tweet={tweet} action={{type: 'like'}}/>
        <ActionBtn tweet={tweet} action={{type: 'unlike'}}/>
      </div>
    </div>
  }