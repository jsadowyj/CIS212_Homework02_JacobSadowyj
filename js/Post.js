export default class Post {
  constructor(title, article, category) {
    // Hopefully no collisions :)
    this.id = Math.floor(Math.random() * 1000000000000);
    this.title = title;
    this.article = article;
    this.date = new Date();
    this.category = category;
  }

  static serialize({ title, article, category }) {
    return new Post(title, article, category);
  }

  static serializeAll(arr) {
    return arr.map((post) => Post.serialize(post));
  }

  static hasSession() {
    return Boolean(sessionStorage.getItem("posts"));
  }

  static getAllPosts() {
    if (!Post.hasSession()) return;
    return Post.serializeAll(JSON.parse(sessionStorage.getItem("posts")));
  }

  getFormattedDate() {
    return `${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()}`;
  }
}
