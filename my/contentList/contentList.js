(function($){
  var items = [{
    icon: './my/img/hongbao.png',
    title: '美团红包'
  },{
    icon: './my/img/shouhuo.png',
    title: '收货地址'
  },{
    icon: './my/img/wenti.png',
    title: '常见问题'
  },{
    icon: './my/img/xieyi.png',
    title: '美团协议与声明'
  },{
    icon: './my/img/tuichu.png',
    title: '退出登录'
  }];

  initContentList(items);

  function initContentList(items){
    var tmpl = getItemsTmpl(items);
    $("#contentList").append(tmpl);

  };


  function getItemsTmpl(items){
    var html = '';
    $(items).each(function(i,v){
      html += '<div class="list-item"><div><div class="item-pic">';
      html +=       '<img class="item-img" src="'+v.icon+'"></div>';
      html +=       '<div class="item-title">'+v.title+'</div></div>';
      html += '<div class="item-more">></div></div>';
    })
    return html;
  }

})($)