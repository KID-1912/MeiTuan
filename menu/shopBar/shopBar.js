(function($){
  window.shopBar = {
    updataPrice(){
      var Cart = window.Cart.foodCart;
      // 计算总价钱
      var totalPrice = 0;
      for(var k in Cart){
        totalPrice += Cart[k].price*Cart[k].count;
      }
      $(".cart-bar .price-num").text(totalPrice);
    },
    // 更新总商品计数
    updateItemsCount(){
      var Cart = window.Cart.foodCart;
      var len = Object.keys(Cart).length;
      $(".cart-bar .cart-count").text(len);
      if(!len) $('.cart-list').hide();
    },
    // shopBar添加商品
    addListItem(itemData){
      var html = '';
      html += '<li class="list-item">';
      html +=   '<div class="item-name">'+itemData.name+'</div>';
      html +=   '<div class="item-price">¥<span class="price-num">'+itemData.price+'</span></div>';
      html +=   '<div class="item-count"><span class="count-num">'+itemData.count+'</span>份</div>';
      html += '</li>';
      var $listItem = $(html);
      $listItem.attr('data-id',itemData.id);
      $('.cart-list .list-items').append($listItem);
      this.updateItemsCount();
    },
    // shopBar移除商品
    removeListItem(itemId){
      $('.list-items').children('[data-id='+itemId+']').remove();
      this.updateItemsCount();
    },
    // 某项商品数量改变
    updateItemCount(itemData){
      var itemId = itemData.id;
      var count = itemData.count;
      var price = itemData.price;
      var totalPrice = price*count;
      var $item = $('.list-items').children('[data-id='+itemId+']');
      $item.find('.count-num').text(count);
      $item.find('.price-num').text(totalPrice);
    }
  };

  // 清空购物车功能
  $('.cart-clear').on('click',function(){
    var $listItems = $('.menu-right-item .buy-num');
    var shopBar = window.shopBar;
    window.Cart.clearCartItems();
    shopBar.updataPrice();
    shopBar.updateItemsCount();
    $listItems.each(function(i,ele){
      $(ele).text(0);
    });
    $('.cart-list .list-items').empty();
    $('.cart-list').hide();
  })

  // 购物车商品列表显示隐藏功能
  $('.cart-toggle').on('click',function(){
    if(Object.keys(window.Cart.foodCart).length === 0) return;
    $('.cart-list').toggle();
  })
})($)