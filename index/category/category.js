// 请求category数据并绑定
(function($){
  
  $.getJSON('./json/category.json',function(result){
    console.log(result);
    if(result.code != 0) return;
    var data = result.data.primary_filter.slice(0,10);
    initCategory(data)
  }) 


  function initCategory(data){
    var html = '';
    $(data).each(function(i,v){
      html += '<a href="" class="category-item"><div class="category-pic">';
      html +=     '<img class="category-img" src="' + v.url + '"></div>';
      html +=     '<div class="category-title">'+ v.name +'</div>';
      html += '</a>';
    });
    $("#category").append(html);
  }


})($)