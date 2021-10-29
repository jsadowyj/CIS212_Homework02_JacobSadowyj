import Post from "./Post.js";

const main = () => {
  // If there is nothing in the session then redirect to the home page so it can get populated
  if (!sessionStorage.getItem("posts")) window.location.replace("index.html");
  const { title } = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  const posts = Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));

  posts.forEach((p) => {
    console.log(p.title);
  });

  const post = posts.find((p) => p.title === title);

  console.log(post);
};

window.addEventListener("load", main);
