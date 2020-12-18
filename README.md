# 這是什麼

## 咬一口廚房餐廳網站

[網站餐廳 Demo](http://restaurant_week18.mentor-4th-alan.com/)

用 Express ( Node.js ) 實作個人餐廳網站，藉此熟悉後端操作。

![restaurant](https://media.giphy.com/media/zyyYRDTFZ3IF3p9R1j/source.gif)

### 網站架構

      訪客頁面

      - 首頁: 顯示菜單、評論、地址
         |
         *- 抽個大獎: 抽獎頁面
         |
         |
         *- 我要點餐: 可以看到各個品項 ( 加入購物車功能還沒實作 )
         |
         |
         *- 查詢訂單 ( 尚未實作 )
         |
         |
         *- 常見問題: 顯示常見問題 ( 點開即可看到回答 )
         |
         |
         *- 登入: 登入頁面

---

    管理員頁面

      - 管理後台:
         |
         *- 獎品後台: 填寫獎項名稱、圖片網址、獎項機率
         |
         |
         *- 點餐後台: 填寫菜單名稱、圖片網址、價格
         |
         |
         *- 訂單後台 ( 尚未實作 )
         |
         |
         *- 常見問題後台: 填寫問題、回答
         |
         |
         *- 登出: 登出

## 目的

- 透過 Node.js、express 學習後端的概念、練習 JavaScript。
- 透過 Sequelize 學習 ORM 架構。
- 基礎的 MVC 架構。

## 功能描述

- 後台可以設置抽獎品項、機率
- 後台可以設置菜單名稱、圖片 url 、價格
- 後台可以設置常見問題、回答
- 訪客可以抽獎

---

## 工具

- AWE EC2 - Ubuntu
- Nginx
- Express
- Sequelize
- EJS
- MySQL
