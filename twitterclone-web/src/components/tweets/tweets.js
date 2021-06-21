import React from 'react';
import { useEffect, useState } from 'react';

export const TweetsComponent = (props) => {
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()

        const new_value = textAreaRef.current.new_value
        console.log(new_value)
        let tempNewTweets = [...newTweets]

        createTweet(new_value, (response, status) => {
            console.log(response, status)
            if (status === 201) {
                tempNewTweets.unshift(response)
            } else {
                alert("An error has ocurred. Please try again")
            }
        })

        setNewTweets(tempNewTweets)
        textAreaRef.current.value = ""
    }

    return <div className={props.className}>
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        <TweetList newTweets={newTweets} />
    </div>

}

export const TweetList = (props) => {
    const [tweetInit, setTweetInit] = useState(props.newTweets ? props.newTweets: [])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)

    useEffect(() => {
        let final = [...props.newTweets].concat(tweetInit)
        
        if (final.length !== tweets.length) {
            setTweets(final)
        }
    }, [props.newTweets, tweetInit, tweets])

    useEffect(() => {
        if (tweetsDidSet === false) {
            const myCallback = (response, status) => {
                console.log(response, status)
                if (status === 200) {
                    const finalTweetsInit = [...response].concat(tweetInit)
                    setTweetInit(finalTweetsInit)
                    setTweetsDidSet(true)
                } else {
                    alert("There was an error")
                }
            }
            loadTweets(myCallback)
        }
    }, [tweetInit, tweetsDidSet, setTweetsDidSet])

    return tweets.map((item, index) => {
        return <Tweet></Tweet>
    })
}