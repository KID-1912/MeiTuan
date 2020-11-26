(function($){
  const meunItems = [{
    iconClass: 'icon-index',
    title: '首页',
    url: './index/index.html'
  },{
    iconClass: 'icon-order',
    title: '订单',
    url: './order/order.html'
  },{
    iconClass: 'icon-my',
    title: '我的',
    url: './my/my.html'
  }];

  initBottomBar(meunItems);

  // 初始化bottombar
  function initBottomBar(items){
    var tmpl = getBottomBarTmpl(items);
    $("#bottomBar").append(tmpl);
    activeCurrent();
  }

  // 生成bottombar的Snippet
  function getBottomBarTmpl(items){
    var html = '';
    $(items).each(function(i,v){
      html += '<a href="'+v.url+'" class="bottombar-item">';
      html +=   '<div class="bottombar-icon '+v.iconClass+'"></div>';
      html +=   '<div class="bottombar-title">'+v.title+'</div>';
      html += '</a>';
    })
    return html;
  }

  // 激活当前item
  function activeCurrent(){
    var urlArr = location.href.split('/');
    var currentItem = urlArr[urlArr.length-1].replace('.html','');
    $('.icon-'+currentItem).addClass('active');
  }

})($)