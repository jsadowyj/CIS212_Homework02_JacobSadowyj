import Post from "./Post.js";

const main = () => {
  // If there is nothing in the session then redirect to the home page so it can get populated
  if (!sessionStorage.getItem("posts")) window.location.replace("index.html");
  const { title } = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  const posts = Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));

  const post = posts.find((p) => p.title === title);

  document.body.innerHTML = `
    <pre>${JSON.stringify(post, null, 2)}</pre>
  `;
};

window.addEventListener("load", main);
