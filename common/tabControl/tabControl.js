
(function($){
  var index = 0;
  var items = ['点菜','评价','商家'];

  initTabControl(items);



  // 初始化TabControl
  function initTabControl(items){
    var tmpl = getTabControlTmpl(items);
    $(".tab-control").append(tmpl);
    $(".tab-control > .tab-item").eq(index).addClass('active');

    // 绑定激活切换功能
    $('.tab-control').on('click','.tab-item',function(){
      $(this).addClass('active').siblings().removeClass('active');
    })
  }



  // 获取TabControlTmpl的Snippet
  function getTabControlTmpl(items){
    var html = '';
    $(items).each(function(i,v){
      html += '<div class="tab-item">'+v+'</div>';
    })
    return html;
  }








})($)