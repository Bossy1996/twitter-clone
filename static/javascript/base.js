const tweetElement = document.getElementById("tweet");
tweetElement.innerHTML = "it's been replaced";
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
    for (i = 0; i < listedItems.lenght; i++) {
        tweetElement.innerHTML = finalTweetStr;
        console.log(xhr.response);
    };
};
xhr.send();