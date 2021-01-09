let template = `
  <tr class="carts__order">
    <td class="carts__id">$id</td>
    <td><button class="carts__delete">刪除</button></td>
    <td><img class="carts__img" src="$img"></td>
    <td class="carts__product-name">$name</td>
    <td><span>$</span><span class="cart__price">$price</span></td>
    <td><input class="number__input" type="number" value="$quantity"></td>
    <td><span>$</span><span class="cart__count">$count</span></td>
  </tr>
`

let carts = []
let id = 1;

if(localStorage.getItem("carts")) {
  carts = JSON.parse(localStorage.getItem("carts"));
  carts.map(cart => {
    const count = Number(cart.price * cart.quantity)
    const newStr = template
    .replace('$id', id)
    .replace('$img', cart.imgUrl)
    .replace('$name', cart.name)
    .replace('$price', cart.price)
    .replace('$quantity', cart.quantity)
    .replace('$count', count)
    // 每筆資料 append 上去
    document.querySelector('.carts__table').insertAdjacentHTML('beforeEnd', newStr)
    id++
    caculatePrices()
  })
}

const inputArr = document.querySelectorAll('.number__input')

for(let i = 0; i < inputArr.length; i++) {
  inputArr[i].addEventListener('click', (e) => {
    const productNumber = e.target.closest('.number__input').value;
    const productPrices = Number(e.target.parentNode.parentNode.querySelector('.cart__price').textContent);
    // 小計
    const count = productNumber * productPrices;
    e.target.parentNode.parentNode.querySelector('.cart__count').textContent  = count
    caculatePrices()
    resetLocalStorage()
  })
}

// 清空購物車
document.querySelector('.carts__clear').addEventListener('click', () => {
  localStorage.removeItem("carts");
  // 清空畫面
  const cartsOrder = document.querySelectorAll('.carts__order')
  cartsOrder.forEach(cart => cart.remove())

  // 清空小計
  document.querySelector('.count__prices').textContent = "";
  // 清空總計
  document.querySelector('.total__prices').textContent = ""; 
})

// 刪除單筆功能
document.querySelector('.carts__table')
.addEventListener('click', (e) => {
  if(e.target.classList.contains('carts__delete')) {
    // 清除單筆畫面
    const parent = e.target.parentNode.parentNode
    parent.remove()
    // 清除單筆資料
    const id = parent.querySelector('.carts__id').textContent
    const cartsData = JSON.parse(localStorage.getItem('carts'))
    cartsData.splice(id - 1, 1)
    localStorage.setItem("carts", JSON.stringify(cartsData));
    // 重新計算總計
    caculatePrices()
  }
})

// 帳單資訊
document.querySelector('.bill__submit').addEventListener('click', (e) => {
  const billName = document.querySelector('input[name=name]').value;
  const billPhone = document.querySelector('input[name=phone]').value;
  const billEmail = document.querySelector('input[name=email]').value;
  const billLocation = document.querySelector('input[name=location]').value;
  const totalPrice = document.querySelector('.total__prices').textContent
  const cartsInfoStr = localStorage.getItem('carts')

  // 把價錢 append 到隱藏 input 表單
  document.querySelector('.bill__total-price').value = totalPrice

  // 從 localStorage 拿取 carts 資料到 input
  document.querySelector('.bill__carts-info-str').value = cartsInfoStr

  if(billName === '' || billPhone === '' || billEmail === '' || billLocation === '') {
    return;
  } 
  setBillToLocalStorage(billName, billPhone, billEmail, billLocation)
  localStorage.removeItem("carts");
})

function setBillToLocalStorage(billName, billPhone, billEmail, billLocation) {
  let billInfo = []
  let newItem = {
      billName,
      billPhone,
      billEmail,
      billLocation,
    };
    billInfo.push(newItem);
    localStorage.setItem("billInfo", JSON.stringify(billInfo));
}

function caculatePrices() {
  let totalCounts = 0
  const cartsOrderArr = document.querySelectorAll('.carts__order')
  cartsOrderArr.forEach(cart => {
    totalCounts += Number(cart.querySelector('.cart__count').textContent)
  })
  const countPrices = document.querySelector('.count__prices')
  // 小計
  countPrices.textContent = totalCounts
  // 運費
  const shippingPrices = document.querySelector('.shipping__prices').textContent
  // 總計
  const totalPrices = totalCounts + Number(shippingPrices)
  document.querySelector('.total__prices').textContent = totalPrices
}

function resetLocalStorage() {
  let carts = []
  const orderArr =  document.querySelectorAll('.carts__order')
  orderArr.forEach((cart) => {
    const productName = cart.querySelector(".carts__product-name").textContent;
    const productPrice = cart.querySelector(".cart__price").textContent;
    const productImgUrl = cart.querySelector(".carts__img").getAttribute("src");
    const quantity = cart.querySelector(".number__input").value;
    console.log(quantity)
    let newItem = {
      name: productName,
      price: productPrice,
      imgUrl: productImgUrl,
      quantity,
    };
    carts.push(newItem);
    localStorage.setItem("carts", JSON.stringify(carts));
  });
}
