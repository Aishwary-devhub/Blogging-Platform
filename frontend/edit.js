const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/posts"
    : "/posts";

const params =new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadPost(){

const response =
await fetch(`${API_URL}/${id}`);

const post =
await response.json();

document.getElementById("title").value =
post.title;

document.getElementById("content").value =
post.content;

}

loadPost();

const form =
document.getElementById("edit-form");

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const title =
document.getElementById("title").value;

const content =
document.getElementById("content").value;

await fetch(`${API_URL}/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content
})

});

window.location.href="index.html";

});