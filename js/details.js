import Post from "./Post.js";

const main = () => {
  // If there is nothing in the session then redirect to the home page so it can get populated
  if (!sessionStorage.getItem("posts")) window.location.replace("index.html");
  const { title } = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  const posts = Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));

  const post = posts.find((p) => p.title === title);

  document.querySelector("main").innerHTML = `
    <h1 id="header" class="ui huge header">
      ${post.title}
      <div class="sub header">
        <strong>Category:</strong> ${post.category}
        <br />
        <strong>Date:</strong> ${post.getFormattedDate()}
      </div>
    </h1>
    <div class="ui divider"></div>
    <div class="content">
      ${post.article}
    </div>
  `;
};

window.addEventListener("load", main);
