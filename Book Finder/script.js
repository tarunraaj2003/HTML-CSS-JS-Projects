document.addEventListener("DOMContentLoaded", () => {
  const bookContainer = document.getElementById("bookContainer");
  const searchBox = document.getElementById("searchBox");
  const bookElements = [];

  const searchBooks = (query) => {
    bookElements.forEach((element) => {
      if (element.innerText.toLowerCase().includes(query.toLowerCase())) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    });
  };

  const loadBooks = async () => {
    try {
      const response = await fetch("https://api.itbook.store/1.0/new");
      const data = await response.json();
      bookContainer.innerHTML = "";
      data.books.forEach((book) => {
        const listItem = document.createElement("li");
        bookElements.push(listItem);
        listItem.innerHTML = `
          <img src="${book.image}" alt="${book.title}" />
          <div class="book-details">
            <h3>${book.title}</h3>
            <p>${book.subtitle}</p>
          </div>
        `;
        bookContainer.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  loadBooks();
  searchBox.addEventListener("input", (e) => searchBooks(e.target.value));
});
