const container = document.querySelector('.back');
const banner = document.querySelector('.game__banner');
const img = document.querySelector('.game__img');
const info = document.querySelector('.info');
const url = 'http://restaurant_week18.mentor-4th-alan.com/get_prize';
const prizeId = document.querySelector('.prize__id').textContent;

function lotto(className, str, imgUrl) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.innerHTML = `
  <img class="img__prize" src="${imgUrl}">
  <div class="price__str">
   <h2>${str}</h2>
   <div class="button__name" onclick="javascript:window.location.reload()">
    我要抽獎
   </div>
  </div>
  `;
  return div;
}

function getPrize(id) {
  return fetch(`${url}/${id}`).then((response) => {
    return response.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    return err;
  });
}

//getPrize
document
  .querySelector('.button__name')
  .addEventListener('click', () => {
    getPrize(prizeId).then(json => {
      return json
    }).then(object => {
      return object.prizeCollection
    }).then(prize => {
      if (prize.prizename === '東京機票') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__first', '恭喜你中頭獎了 ! 日本東京來回雙人遊 !', prize.imgurl);
        container.appendChild(div);
      } else if (prize.prizename === '演唱會') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__second', '二獎！演唱會！', prize.imgurl);
        container.appendChild(div);
      } else if (prize.prizename === '手機') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__third', '手機一台！', prize.imgurl);
        container.appendChild(div);
      } else if (prize.prizename === '銘謝惠顧') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__none', '銘謝惠顧', prize.imgurl);
        container.appendChild(div);
      } else if (prize.prizename === '飯票一張') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__none', '飯票一張', prize.imgurl);
        container.appendChild(div);
      } else if (prize.prizename === 'aa') {
        container.removeChild(info);
        banner.removeChild(img)
        const div = lotto('banner__none', 'aa', prize.imgurl);
        container.appendChild(div);
      }
    })
  });
