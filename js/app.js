var counter = 1;
//this comment append the created comment in commentMaker() to body or replie container
function commentAppender(){
    let text = document.getElementById("comment").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    let body = document.getElementById("body");
    body.appendChild(commentMaker(text, name, email));

    let html = commentMaker(text, name, email).innerHTML;

    document.getElementById("comment").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}
function replyAppender(){
    let text = document.getElementById("repText").value;
    let name = document.getElementById("repName").value;
    let email = document.getElementById("repEmail").value;
    let id = document.getElementById("reply-form").getAttribute("data-contId");
    document.getElementById(id).appendChild(commentMaker(text, name, email));

    document.getElementById("repText").value = "";
    document.getElementById("repName").value = "";
    document.getElementById("repEmail").value = "";
}
function commentMaker(text, name, email){
    let container = document.createElement("div");
    container.className += "container " + "comment";
    container.setAttribute("id", "comment-"+(counter++).toString());

    //row for img & comment
    let row = document.createElement("div");
    row.className += " row";
    container.appendChild(row);

    //div for img & name
    let info = document.createElement("div");
    info.className += " col-md-3";
    info.setAttribute("id", "info-cont-" + counter);
    row.appendChild(info);

    //img
    let profile = document.createElement("img");
    profile.setAttribute("src", "img/user" + getRndInteger(3,6) + ".png");
    profile.setAttribute("alt", "profile");
    info.appendChild(profile);

    //name
    let h5 = document.createElement("h5");
    h5.className += "p-2 name";
    h5.innerHTML = name;
    info.appendChild(h5);

    //comment
    let commentDiv = document.createElement("div");
    commentDiv.className += " col-md-9 pt-3 w-50";
    row.appendChild(commentDiv);
    
    //p element for upper div (optional)
    let para = document.createElement("p");
    para.innerHTML = text;
    commentDiv.appendChild(para);

    //button for replying
    replyBtn = document.createElement("button");
    replyBtn.className += " btn btn-primary mt-2 mb-3 mx-2 reply-button";
    replyBtn.setAttribute("id", "reply-" + counter);
    replyBtn.setAttribute("onclick", "replyButton(this.id)");
    replyBtn.innerHTML = "reply";
    container.appendChild(replyBtn);

    //button for showing replied comments
    showBtn = document.createElement("button");
    showBtn.className += " btn btn-success mt-2 mb-3 mx-2 reply-button";
    showBtn.setAttribute("id", "show-" + counter);
    showBtn.setAttribute("onclick","showRepliesButton(this.id)");
    showBtn.innerHTML = "Show Reply";
    container.appendChild(showBtn);

    //making an empty div. this div append the replied comment
    let repliesCont = document.createElement("div");
    repliesCont.className = "replies container pl-5";
    repliesCont.setAttribute("id", "replies-" + counter);
    repliesCont.setAttribute("style", "display: none;");
    container.appendChild(repliesCont);

    // let hr = document.createElement("hr");
    // container.appendChild(hr);
    
    return container;
}
//get random integer to set profile img randomly
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
/*this function will be given to reply button and will do:
 1: wirte which user you are replying to in top of the form
 2: chnage the form in html (we have tow form a form for replying and another for commenting)
*/
function replyButton(id){
    //let name = document.getElementById(id).querySelector(".col-md-3").lastChild.innerHTML;
    let num = document.getElementById(id).getAttribute("id").substr(6, 1);
    let name = document.getElementById("info-cont-" + num).lastChild.innerHTML;

    let contId = document.getElementById("reply-form");
    let contValue = document.querySelector("#replies-" + num).getAttribute("id");
    contId.setAttribute("data-contId", contValue);

    document.getElementById("comment-form").style.display = "none";
    document.getElementById("reply-form").style.display = "block";
    document.getElementById("repText").setAttribute("placeholder", "replying to " + name);
}
function showRepliesButton(id){
    let elm = document.getElementById(id).nextSibling;
    if(elm.style.display == "none"){
        elm.style.display = "block";
    }
    else if(elm.style.display == "block"){
        elm.style.display = "none";
    }
}
function exitReplyingMode(){
    document.getElementById("comment-form").style.display = "block";
    document.getElementById("reply-form").style.display = "none";
}