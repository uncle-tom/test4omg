(function() {
  var isIE = /msie/gi.test(navigator.userAgent);
  
  this.infiniteScroll = function(options) {
    var defaults = {
      callback: function() {},
      distance: 100
    }
    // установка дефолтных значений
    for (var key in defaults) {
      if(typeof options[key] == 'undefined') options[key] = defaults[key];
    }  
    
    var scroller = {
      options: options,
      updateInitiated: false
    }
    
    window.onscroll = function(event) {
      handleScroll(scroller, event);
    }
  }
  
  function getScrollPos() {
    // обработка позиции скролла в случае с ИЕ будет другим
    if (isIE) {
      return document.documentElement.scrollTop;
    } else {
      return window.pageYOffset;
    }
  }
  
  var prevScrollPos = getScrollPos();
  
  // обрабатываем scroll-ивенты
  function handleScroll(scroller, event) {
    // пока обрабатывает коллбек предыдушего вызова - ничего не делать
    if (scroller.updateInitiated) {
      return;
    }   
    var scrollPos = getScrollPos();
    if (scrollPos == prevScrollPos) {
      return; // если позиция по скролу не изменилась - ничего не делать
    }
    
    // найти pageHeight и clientHeight
    // (кол-во пикселей, которое нужно проскроллить чтобы scrollbar достиг максимальной позиции)
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    
    // проверка позиции scroll bar (должна быть 50px выше максимума, 
    // если да, то инициировать апдейт
    if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
      scroller.updateInitiated = true;
  
      scroller.options.callback(function() {
        scroller.updateInitiated = false;
      });
    }
    
    prevScrollPos = scrollPos;  
  }
}());
