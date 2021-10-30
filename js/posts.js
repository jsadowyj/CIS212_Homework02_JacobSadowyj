import Post from "./Post.js";
const button = document.querySelector("button.ui.button");

// Handle message close
$(".message .close").on("click", function () {
  $(this).closest(".message").transition("fade");
});

const generateSuccessMessage = (msg) => {
  const message = document.querySelector(".ui.positive.message");
  message.classList.remove("hidden");
  message.querySelector("p").innerText = msg;
};

const generateErrorMessage = (msg) => {
  const message = document.querySelector(".ui.negative.message");
  message.classList.remove("hidden");
  message.querySelector("p").innerText = msg;
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  const existingPosts = Post.getAllPosts();
  const form = e.target.parentNode;
  const title = form.querySelector("#title").value;
  const category = form.querySelector("#category").value;
  const article = tinymce.activeEditor.getContent();

  // Guard Clauses
  if (!article || !category || !title)
    return generateErrorMessage("Please fill out all fields.");
  if (existingPosts.some((post) => post.title === title))
    return generateErrorMessage("A post with that title already exists!");

  Post.addPost(new Post(title, article, category));
  generateSuccessMessage("Post has been added succesfully.");

  form.querySelector("#title").value = "";
  form.querySelector("#category").value = "";
  tinymce.activeEditor.setContent("");
});
