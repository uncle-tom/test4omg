window.onload = function() {
  var button = document.getElementsByClassName('add-more')[0];
  if(button){
    button.addEventListener("click", function(){
      callJsonAndAddRow();
    });
  }

  // при клике выполняем функцию скрола вверх
  var up = document.getElementById('arrowsup')
  if(up) {
    up.addEventListener("click", function(){
      scrollToTop(1000);
    });
  }

  var infinite_scroll_checkbox = document.getElementById('checkbox');
  if(infinite_scroll_checkbox) {
    checkbox.addEventListener("click", function(){
      if(this.checked) {
        infiniteScroll({callback: function(done) {
          callJsonAndAddRow(done);
          hideButton();
        }});
      } else {
        infiniteScroll({callback: function(done) { }});
        showButton();
      }
    });
  }

  // делаем пошаговую плавную прокрутку вверх
  function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15);
      scrollInterval = setInterval(function(){
      	if ( window.scrollY != 0 ) {
        	window.scrollBy( 0, scrollStep );
      	}
      	else clearInterval(scrollInterval); 
  		},15);
  };

  // скрываем кнопку Показать еще
  function hideButton(){
    document.getElementsByClassName('button-center')[0].style.display="none";
  }

  // показываем кнопку Показать еще
  function showButton(){
   document.getElementsByClassName('button-center')[0].style.display="block"; 
  }


  function addRow(items) {
    var row = document.createElement('div');

    // классы для новосоздаваемых ячеек 
    var klassnames = {0: 'one', 1: 'two', 2: 'three'};

    // аккамулятор для HTML'я
    row.innerHTML = '';

    for(var i in items) {
      row.innerHTML += '<div class="'+klassnames[i]+'">\
        <div class="inner">\
          <div class="inner-body">\
            <img src="'+items[i].image+'" alt="">\
            <div class="stars"><img src="img/stars.png" alt=""></div>\
            <div class="inner-body__title">'+items[i].title+'</div>\
            <div class="inner-body__description">'+items[i].paragraph+'</div>\
          </div>\
        </div>\
      </div>';
    }

    var container = document.getElementsByClassName('wrapper')[0];

    // добавить дочерний элемент в DOM
    container.appendChild(row);
  };

  function callJsonAndAddRow(done) {
    // 1. сделать запрос к БЕ
    XHRequest({
      path: 'http://localhost:3000/items.json',
      complete: function(resp) {
        // 2. вставить результаты на страницу
        addRow(JSON.parse(resp));
        // 3. вызвать ф-ию done когда мы закончили
        if(typeof done === 'function') {
          done();
        }
      }
    })
  }

  function XHRequest(options) {
    xhr = new XMLHttpRequest();

    if (!xhr) {
      alert('Не удалось создать экземпляр класса XMLHTTP. Обновите свой браузер пожалуйста');
      return false;
    }

    if (!options.path) {
      alert('Не указан адрес на сервере для получения данных.');
      return false;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          options.complete(xhr.responseText);
        } else {
          alert('There was a problem with the request.');
        }
      }
    }

    xhr.open('GET', options.path);
    xhr.send();
  };
}
