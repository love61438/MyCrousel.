//嘗試創建一個可以執行簡單動畫的函數
      /*
        obj 要執行動畫的對象.
        attr 要執行動畫的樣式比如，left top width length
        target 執行動畫的目標位置
        speed 移動的速度(正數向右，負數向左)
        callback 回調函數，會在動畫結束後進行
      */

     function move(obj, attr, target, speed, callback)
     {
       clearInterval(obj.timer);

       //獲取元素目前的位置
       var current = parseInt(getStyle(obj, attr));

       //判斷速度的正負值
       //如果從0向800移動，則speed為正
       //如果從800向0移動，則speed為負
       if (current > target) {
         speed = -speed;
       }
       //向執行動畫的對象中添加一個timer屬性，用來保存它自己的定時器的標示
       obj.timer = setInterval(function ()
       {
         var oldValue = parseInt(getStyle(obj, attr));
         var newValue = oldValue + speed;
         //判斷newValue是否大於800
         //以800向0移動
         //向左移動時，需要判斷newValue是否小於target
         //向右移動時，需要判斷newValue是否大於target
         if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
           newValue = target;
         }

         obj.style[attr] = newValue + "px";
         if (newValue == target) {
           clearInterval(obj.timer);
           //動畫執行完畢，調用回調函數
           //如果有傳再執行
           callback && callback();
         }

       }, 30);
     }

     function getStyle(obj, name)
     {
       if (window.getComputedStyle) {
         return getComputedStyle(obj, null)[name];
       } else {
         return obj.currentStyle[name];
       }
     }