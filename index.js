const totalDisplay = document.querySelector(".total");
const listProducts = document.querySelector('.list-products');


function updateTotal() {
  let total = 0;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const unitPrice = parseFloat(card.querySelector(".unit-price").textContent);
    const quantity = parseInt(card.querySelector(".quantity").textContent);
    total += unitPrice * quantity;
  });

  totalDisplay.textContent = `${total.toFixed(2)} $`;
}


document.querySelector(".list-products").addEventListener("click", function(e) {
  const target = e.target;
  const card = target.closest(".card");

  if (!card) return; 

  if (target.classList.contains("fa-plus-circle")) {
    const quantityEl = card.querySelector(".quantity");
    quantityEl.textContent = parseInt(quantityEl.textContent) + 1;
    updateTotal();
  }

  if (target.classList.contains("fa-minus-circle")) {
    const quantityEl = card.querySelector(".quantity");
    const currentQty = parseInt(quantityEl.textContent);
    if (currentQty > 0) {
      quantityEl.textContent = currentQty - 1;
      updateTotal();
    }
  }

  if (target.classList.contains("fa-trash-alt")) {
    card.closest(".card-body").remove();
    updateTotal();
  }

  if (target.classList.contains("fa-heart")) {
    target.classList.toggle("liked");
  }
});
  
