let cart = [];
const getProducts = async () => {
  try {
    let response = await fetch("https://striveschool-api.herokuapp.com/books");
    let books = await response.json();
    // const [firstBook] = books;
    // console.log(firstBook);
    // console.log(firstBook.title);
    const container = document.getElementById("card-deck");
    const mappedProducts = books.map((book) => {
      //   console.log(book.title);
      container.innerHTML += `<div class="col col-sm-4 mb-5">
      <div class="card" data-book="${book.title}">
        <img class="card-img-top" style="height: 250px;
        width: 100%;
        object-fit: cover;" src="${book.img}" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">
            ${book.price}
          </p>
          <p class="card-text">
            <small class="text-muted">${book.category}</small>
          </p>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary add-to-cart">Add</button>
          <button type="button" class="btn btn-secondary   skip">skip</button>
        </div>
      </div>
    </div> 
    `;
    });
    bookFunction();
    searchFunction(books);
    return books;
  } catch (error) {
    console.error("Error:", error);
  }
};

const bookFunction = () => {
  // Add click event listener to "Add" button

  document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the parent card element
      let card = button.closest(".card");

      let bookTitle = card.dataset.book;

      if (cart.includes(bookTitle)) {
        // Remove the item to the cart
        cart.pop(bookTitle);
        console.log(cart);

        // Change the card styling to indicate that the element is in the cart
        card.style.border = "";
        button.classList.replace("btn-danger", "btn-primary");
        button.innerText = "add";
        reduceFunction();
      } else {
        // Add the item to the cart
        cart.push(bookTitle);
        console.log(cart);

        // Change the card styling to indicate that the element is in the cart
        card.style.border = "2px solid red";
        button.classList.replace("btn-primary", "btn-danger");
        button.innerText = "remove";
        reduceFunction();
      }
    });
  });
  document.querySelectorAll(".skip").forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the parent card element
      let card = button.closest(".col");
      card.remove();
    });
  });
};

const searchFunction = (books) => {
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      let searchValue = this.value;
      if (searchValue.length > 3) {
        // Use filter method to only display books with a matching title
        let filteredBooks = books.filter((book) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        // Re-render the card-deck with the filtered books
        renderBooks(filteredBooks);
      } else {
        // If the search value is less than 3 characters, render all books
        renderBooks(books);
      }
    });
};

const renderBooks = (books) => {
  let cardDeck = document.getElementById("card-deck");
  cardDeck.innerHTML = "";
  for (const book of books) {
    cardDeck.innerHTML += `<div class="col col-sm-4 mb-5">
    <div class="card" data-book="${book.title}">
      <img class="card-img-top" style="height: 250px;
      width: 100%;
      object-fit: cover;" src="${book.img}" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">
          ${book.price}
        </p>
        <p class="card-text">
          <small class="text-muted">${book.category}</small>
        </p>
      </div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary add-to-cart">Add</button>
        <button type="button" class="btn btn-secondary   skip">skip</button>
      </div>
    </div>
  </div> 
        `;
  }
};

const reduceFunction = () => {
  const countCartItems = cart.reduce((acc, item) => {
    return acc + 1;
  }, 0);

  console.log(countCartItems);
  document.getElementById(
    "count"
  ).innerText = `Items in card: ${countCartItems} `;
};

const clearCart = () => {
  cart.forEach((book) => {
    cart.pop(book);
  });
  cart = [];
  reduceFunction();
  getProducts();
};

window.onload = () => {
  getProducts();
  //   searchFunction();
};
