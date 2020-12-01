(function($){
  // 左侧初始化中请求数据成功后执行
  window.itemPositions = [];
  window.initRight = function(data){
    var Cart = window.Cart;
    appendTmpl(data);

    initItemPosition();
    console.log(itemPositions);

    onPlusOrMinus();
  }

  // 存储所有item的纵向位置
  function initItemPosition(){
    $(".menu-right-item").each(function(i,$ele){
      itemPositions.push($ele.offsetTop);
    })
  }

  // 添加增减数量的功能
  function onPlusOrMinus(){
    // 增加
    $(".right .control-buy").on('click','.buy-increase',function(e){
      e.preventDefault();
      // 更新计数器
      var counter = $(this).prev();
      var count = parseInt(counter.text());
      counter.text(count+=1);
      // 更新Cart数据
      var itemData = $(this).parents('.list-item').data('data');
      Cart.plusCount(itemData);
      console.log(Cart.foodCart);
    });
    // 减少
    $(".right .control-buy").on('click','.buy-decrease',function(e){
      e.preventDefault();
      // 更新计数器
      var counter = $(this).next();
      var count = parseInt(counter.text());
      if(count === 0) return;
      counter.text(count-=1);
      // 更新Cart数据
      var itemData = $(this).parents('.list-item').data('data');
      Cart.minusCount(itemData.id);
      console.log(Cart.foodCart);
    })
  }

 
  //获取右侧的Snippet
  function appendTmpl(data){
    var $right = $('.right');
    $(data).each(function(i,v){
      var html = '';
      html += '<div class="menu-right-item">';
      html += '<div class="item-title">'+ v.name +'</div>';
      html +=     '<ul class="item-list">';
      html +=     '</ul></div>';
      var $html = $(html);
      appendItemTmpl($html.find('.item-list'),v.spus);
      $right.append($html);
    });
  }
  function appendItemTmpl($item,itemList){
    $(itemList).each(function(i,v){
      var html = '';
      html += '<li class="list-item"><a class="item-link" href="">';
      html +=   '<div class="item-pic"><img class="item-img" src="'+v.picture+'"></div>';
      html +=   '<div class="item-info">';
      html +=     '<div class="item-name">'+v.name+'</div>';
      html +=     '<div class="item-dsc text-ellipsis">'+v.description+'</div>';
      html +=     '<div class="item-sale">'
      if(v.saleNum) 
        html +=       '<span class="sale-num">+v.prai月售'+v.saleNum+'</span>';
      html +=         '<span class="sale-link">'+v.praise_content+'</span></div>';
      html +=     '<div class="item-price">';
      html +=         '<div class="price-num">¥'+v.min_price+'</div>';
      html +=     '<div class="control-buy">';
      html +=           '<button class="buy-decrease" type="button"></button>';
      html +=          '<span class="buy-num">0</span>'
      html +=          '<button class="buy-increase" type="button"></button>';
      html +=    '</div></div></div></a></li>';
      $item.append($(html).data('data',v));
    })
  }

})($)