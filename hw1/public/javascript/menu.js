
let carts = []

document
  .querySelector('.menu__container')
  .addEventListener('click', (e) => {
    if(e.target.classList.contains("meal__add-btn")) {
      const product = e.target.parentNode
      const productImgUrl = product.children[0].getAttribute('src')
      const productInfo = product.children[1]
      const productName = productInfo.children[0].textContent
      const productPrice = productInfo.children[1].textContent
      let newItem = {
        name: productName,
        price: productPrice,
        imgUrl: productImgUrl,
        quantity: 1,
      }
      carts.push(newItem)
      localStorage.setItem("carts", JSON.stringify(carts))
      const counts = document.querySelector('.counts')
      counts.textContent = "";
      counts.classList.remove("null")
      counts.append(carts.length)
      }
  });

if(localStorage.getItem("carts")) {
  carts = JSON.parse(localStorage.getItem("carts"));
  const counts = document.querySelector('.counts')
  if(carts.length !== undefined && carts.length !== 0) {
    counts.classList.remove("null")
    counts.append(carts.length)
  }
}
