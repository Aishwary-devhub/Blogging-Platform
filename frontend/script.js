const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/posts"
    : "/posts";

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.style.opacity = "1";

setTimeout(()=>{

toast.style.opacity = "0";

},3000);

}

// FETCH POSTS

async function fetchPosts() {

document.getElementById("loading")
.style.display="block";

const container =
document.getElementById("posts-container");

if(!container) return;

try{

const response =
await fetch(API_URL);

const posts =
await response.json();

container.innerHTML = "";

document.getElementById("loading")
.style.display="none";

posts.forEach(post=>{

container.innerHTML += `

<div class="card">

<h3>${post.title}</h3>

<small>
${new Date(post.createdAt).toLocaleDateString()}
</small>

<p>
${post.content.substring(0,120)}...
</p>

<div class="btn-group">

<button
class="read-btn"
onclick="window.location.href='post.html?id=${post._id}'">

Read More

</button>

<button
class="edit-btn"
onclick="window.location.href='edit.html?id=${post._id}'">

Edit

</button>

<button
class="delete-btn"
onclick="deletePost('${post._id}')">

Delete

</button>

</div>

</div>

`;

});

}

catch(error){

document.getElementById("loading")
.style.display="none";

console.log(error);

}

}



// DELETE POST

async function deletePost(id){

const confirmDelete =
confirm("Are you sure you want to delete this post?");

if(!confirmDelete) return;

await fetch(`${API_URL}/${id}`,{
method:"DELETE"
});

showToast("Post Deleted Successfully");

fetchPosts();

}



// CREATE POST

const form = document.getElementById("post-form");

if(form){

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const title =
document.getElementById("title").value;

const content =
document.getElementById("content").value;

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
content
})

});

showToast("Post Created Successfully");

window.location.href="index.html";

});

}

fetchPosts();