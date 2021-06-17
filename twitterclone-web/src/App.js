import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

const loadTweets = (callback) => {
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

function ActionBtn(props){
  const {tweet, action} = props
  const className = props.className ? props.className: 'btn btn-small btn-primary'
  return action.type === 'like' ? <buttom className={className} >{tweet.likes} Like</buttom>: null
}

function Tweet(props) {
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

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((item, index) => {
            return <Tweet tweet={item} className='my-5 py-5 boder bg-white text-dark' key={`${index}-{item.id}`} />
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
