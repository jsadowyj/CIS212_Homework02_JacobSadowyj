import { data } from "./data.js";
import Post from "./Post.js";

const main = () => {
  if (!sessionStorage.getItem("posts")) {
    // serializing the raw data into instances of my Post class
    // this is basically so it will automatically generate a date for all the posts
    const dummyPosts = data.map((post) => Post.serialize(post));
    sessionStorage.setItem("posts", JSON.stringify(dummyPosts));
  }

  const posts = Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));
  console.log(posts);

  const html = posts
    .map((post) => {
      return `
        <div class="item">
          <div class="image">
            <img src="static/wireframe.png" />
          </div>
            <div class="content">
              <a class="header" href="details.html?title=${encodeURIComponent(
                post.title
              )}">${post.title}</a>
              <div class="meta">
              <span>${post.date.toLocaleDateString()}</span>
            </div>
            <div class="description">
              <p></p>
            </div>
            <div class="extra">${post.article}</div>
          </div>
        </div>
    `;
    })
    .join("");

  document.querySelector("#posts").innerHTML = html;
};

// tiny mce wouldn't work unless I did this
window.addEventListener("load", main);
