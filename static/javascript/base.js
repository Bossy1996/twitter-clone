const tweetCreateFormEl = document.getElementById("tweet-create-form")

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
            } else {
                alert("An error ocurred please try again")
            }
            console.log(errorJson)
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

function handleDidLike(tweet_id, currentCount) {
    console.log(tweet_id, currentCount)
}

function LikeBtn(tweet){
    return "<buttom class='btn btn-small btn-primary' onClick=handleDidLike(" + tweet.id +"," + tweet.likes + ")>"+ tweet.likes +" Like</buttom>"
}

function formatTweetElement(tweet) {
    let formatedTweet = "<div class='col-12 col-md-10 mx-auto mb-4 border rounded py-3' id='tweet-"+ tweet.id 
    +"'>" + "<p>" + tweet.content + 
        "</p><div class='btn-group'>" + LikeBtn(tweet) +
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
        const listedItems = serverResponse.response;
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