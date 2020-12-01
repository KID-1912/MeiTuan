// 菜单页左侧初始化

(function($){
  var itemPosition = window.itemPositions;
  initLeft();

  function initLeft(){
    ajaxData().then(function(data){
      //先初始化右侧
      window.initRight(data);
      //初始化左侧
      var tmpl = getLeftTmpl(data);
      $(".menu-left").append(tmpl);
      $(".menu-left>.menu-left-item").eq(0).addClass('active');
      onActive();
    })
  }

  // 左侧菜单点击切换active，右侧自动scroll正确位置
  function onActive(){
    $(".menu-left").on('click','.menu-left-item',function(){
      $(this).addClass('active').siblings().removeClass('active');
      var curIndex = $(this).index();
      var y = itemPositions[curIndex];
      $('.right').animate({scrollTop: y},200);
    })
  }

  // 请求点菜页数据完成，初始化左侧菜单与右侧菜单
  function ajaxData(){
    var promise = new Promise(function(resolve,reject){
      $.getJSON('./json/food.json',function(result){
        if(result.code !== 0) reject('请求失败');
        resolve(result.data.food_spu_tags);
      })
    });
    return promise;
  }

  function getLeftTmpl(data){
    var html = '';
    $(data).each(function(i,v){
      html += '<li class="menu-left-item">';
      if(v.icon) 
        html +=    '<img class="item-img" src="'+v.icon+'">';
      html +=     '<span class="item-name">'+v.name+'</span>';
      html += '</li>';
    })
    return html;
  }


})($)