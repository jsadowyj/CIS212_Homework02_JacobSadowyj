export default class Post {
  constructor(title, article, category) {
    this.title = title;
    this.article = article;
    this.date = new Date();
    this.category = category;
  }

  static serialize({ title, article, category, date }) {
    const post = new Post(title, article, category);
    if (date) post.date = new Date(date);
    return post;
  }

  static serializeAll(arr) {
    return arr.map((post) => Post.serialize(post));
  }

  static hasSession() {
    return Boolean(sessionStorage.getItem("posts"));
  }

  static getAllPosts() {
    if (!Post.hasSession()) throw new Error("No session");
    return Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));
  }

  static addPost(post) {
    const posts = Post.getAllPosts();
    posts.push(post);
    sessionStorage.setItem("posts", JSON.stringify(posts));
  }

  static deletePost({ title }) {
    const posts = Post.getAllPosts();
    const filteredPosts = posts.filter((post) => post.title !== title);
    sessionStorage.setItem("posts", JSON.stringify(filteredPosts));
  }

  getFormattedDate() {
    return `${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()}`;
  }
}
