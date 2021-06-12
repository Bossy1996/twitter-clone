const tweetCreateFormEl = document.getElementById("tweet-create-form")

function handleTweetFormError(msg, display) {
    let myErrorDiv = document.getElementById("tweet-create-form-error")
    if (display === true) {
        // Show error
        myErrorDiv.setAttribute("class", "d-block alert alert-danger")
        myErrorDiv.innerText = msg 
    } else {
        // hide the error
        myErrorDiv.setAttribute("class", "d-none alert alert-danger")
    }
}

function handleTweetCreateFormDidSubmit(event) {
    event.preventDefault();
    const myForm = event.target
    const myFormData = new FormData(myForm)
    const url = myForm.getAttribute("action")
    const method = myForm.getAttribute("method")
    const xhr = new XMLHttpRequest()
    const responseType = "json";
    xhr.responseType = responseType;
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested_With", "XMLHttpRequest")
    xhr.onload = () => {
        if (xhr.status === 201) {
            const newTweetJson = xhr.response
            // const newTweetJson = JSON.parse(newTweet)
            const newTweetElement = formatTweetElement(newTweetJson)
            console.log(newTweetElement)
            const ogHhtml = tweetsContainerElemet.innerHTML
            tweetsContainerElemet.innerHTML = newTweetElement + ogHhtml
            myForm.reset()
        } else if (xhr.status === 400) {
            const errorJson = xhr.response
            const contentError = errorJson.content
            let contentErrorMsg;
            if (contentError) {
                contentErrorMsg = contentError[0]
                if (contentErrorMsg) {
                    handleTweetFormError(contentErrorMsg, true)
                } else {
                    alert("An error ocurred please try again")
                }
            } else {
                alert("An error ocurred please try again")
            }
            console.log(errorJson)
        } else if (xhr.status === 401) {
            alert("You must be logged in")
            window.location.href = "/login"
        } else if (xhr.status === 403) {
            alert("You must be logged in")
            window.location.href = "/login"
        } else if (xhr.status === 500) {
            alert("There was a server error, please try again later")
        }
        
    }
    xhr.onerror = () => {
        alert("An error ocurred. Please try again later")
    }
    xhr.send(myFormData)

}
tweetCreateFormEl.addEventListener("submit", handleTweetCreateFormDidSubmit)


const tweetsContainerElemet = document.getElementById("tweets");

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function handleDidLike(tweet_id, currentCount, action) {
    console.log(tweet_id, currentCount)
    const url = "api/tweet/action"
    const mehtod = "POST"
    data = JSON.stringify({
        id: tweet_id,
        action: action
    })
    const xhr = new XMLHttpRequest()
    const csrftoken = getCookie('csrftoken');
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested_With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload(() => {
        loadTweets(tweetsContainerElemet)
    })
    xhr.send(data)
}

function Retweet(tweet){
    return "<buttom class='btn btn-small btn-outline-success' onClick=handleDidLike(" + tweet.id +"," + tweet.likes,  + ",'Retweet')>Retweet</buttom>"
}

function UnLikeBtn(tweet){
    return "<buttom class='btn btn-small btn-outline-primary' onClick=handleDidLike(" + tweet.id +"," + tweet.likes,  + ",'like')>Unlike</buttom>"
}

function LikeBtn(tweet){
    return "<buttom class='btn btn-small btn-primary' onClick=handleDidLike(" + tweet.id +"," + tweet.likes,  + ",'like')>"+ tweet.likes +" Like</buttom>"
}

function formatTweetElement(tweet) {
    let formatedTweet = "<div class='col-12 col-md-10 mx-auto mb-4 border rounded py-3' id='tweet-"+ tweet.id 
    +"'>" + "<p>" + tweet.content + 
        "</p><div class='btn-group'>" + 
            LikeBtn(tweet) +
            UnLikeBtn(tweet) + 
            Retweet(tweet) +
        "</div></div>";
    return formatedTweet
}

const loadTweets = (tweetsElement) => {
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "/tweet";
    const responseType = "json";
    xhr.responseType = responseType;
    xhr.open(method, url);
    xhr.onload = () => {
        const serverResponse = xhr.response;
        const listedItems = serverResponse;
        var finalTweetStr = "";
        var i;
        for (i=0; i<listedItems.length; i++) {
            tweetObj = listedItems[i]
            let currentItem = formatTweetElement(tweetObj)
                finalTweetStr += currentItem
    }
    tweetsElement.innerHTML = finalTweetStr
    // console.log(listedItems)
  };
    xhr.send();
}
loadTweets(tweetsContainerElemet)