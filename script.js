let container = document.getElementById("container");

async function getPosts() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (Response) => Response.json()
  );

  console.log(posts);
  return posts;
}
async function getComments() {
  const comments = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  ).then((Response) => Response.json());
  console.log(comments);
  return comments;
}
function writePosts() {
  Promise.all([getPosts(), getComments()]).then(([posts, comments]) => {
    let updateHTML = "";
    posts.forEach((post) => {
      let commentsOfpost = comments.filter(
        (comment) => comment.postId == post.id
      );

      let writeHtmlForComment = commentsOfpost
        .map((commentPost) => {
          return `<div class="comments">
      <strong>${commentPost.email}</strong>
      <br>
      <u>${commentPost.name}</u>
      <br>
      <span>${commentPost.body}</span></div>`;
        })
        .join("");

      container.innerHTML = updateHTML += `<div class="post">
        <h1>${post.title}</h1>
        <br>
        <span>${post.body}</span>
        </span>${writeHtmlForComment}</div> `;
    });
    container.innerHTML = updateHTML;
  });
}

writePosts();
