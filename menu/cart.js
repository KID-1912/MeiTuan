(function($){
  window.Cart = {
    foodCart: {}, //购物车数据
    plusCount(itemData){  //新增数量
      var id = itemData.id;
      var item = this.foodCart[id];
      var shopBar = window.shopBar;
      if(item){
        item.count += 1;
        shopBar.updateItemCount(item);
      }else{
        var cartItem = this.createCartItem(itemData);
        this.foodCart[id] = cartItem;
        shopBar.addListItem(cartItem);
      }
      shopBar.updataPrice();
    },
    minusCount(id){ // 减少数量
      var item = this.foodCart[id];
      var shopBar = window.shopBar;
      item.count -= 1;
      shopBar.updataPrice();
      if(item.count === 0){
        delete this.foodCart[id]
        shopBar.removeListItem(id);
      }else{
        shopBar.updateItemCount(item);
      }
    },
    createCartItem(ops){ //新商品加入
      var item = {};
      item.id = ops.id;
      item.name = ops.name;
      item.price = ops.min_price;
      item.count = 1;
      return item;
    },
    clearCartItems(){ //清空购物车
     this.foodCart = {};
    }
  }
})($)