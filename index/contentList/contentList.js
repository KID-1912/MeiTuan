// 请求contentList数据并绑定
(function($){
  initContentList();

  // 滚动加载下一page功能
  var advDis = 30; //滚动缓冲长度
  var curpage = 0;  // 默认当前页
  var maxPage = 3;  //最多可查看页
  var isLoading = true; // 加载状态
  var $window = $(window);
  var $loadingBox = $('.loading-box');
  $(window).on('scroll',function(){
    var $this = $(this);
    var clientHeight = $window.height();
    var scrollTop = $this.scrollTop();
    var scrollHeight = $("#shopList").height();
    if(scrollTop + clientHeight >= scrollHeight - advDis){
      if(isLoading) return;
      if(curpage > maxPage) return $loadingBox.text('-- 到底了 --');
      $loadingBox.show();
      isLoading = true;
      initContentList();
      console.log('请求了shoplist数据');
    }
  })

  // 请求并绑定数据
  function initContentList(){
    ajaxData().then(function(data){// 请求成功
      var tmpl = getContentTmpl(data);
      $("#shopList").append(tmpl);
      curpage++;
      isLoading = false;
    },function(errcode){ //请求失败
      console.log("请求失败，错误代码"+errcode);
    });
  }

  // ajax请求
  function ajaxData(){
    return new Promise((resolve,reject) => {
      $.getJSON('./json/shoplist.json',function(result){
        console.log(result);
        if(result.code != 0) reject(result.code);
        resolve(result.data.poilist);
      });
    });
  }
  // 返回contentList的Snippet
  function getContentTmpl(data){
    var html = '';
    $(data).each(function(i,v){
      html += '<a class="shop-item" href="./menu/menu.html"><div class="shop-pic">';
      html +=   getShopLogoTmpl(v.pic_url);
      html +=   getShopNameTmpl(v.name);
      var saleNum = getSaleNum(v.month_sale_num);
      html +=   getShopDetailTmpl(v.wm_poi_score,saleNum,v.mt_delivery_time,v.distance);
      html +=   getShopPriceTmpl(v.min_price_tip,v.shipping_fee_tip,v.average_price_tip);
      if(v.discounts2){
        var discounts = v.discounts2.slice(0,2);
        html +=   getShopActivityTmpl(discounts);
      };
      html += '</div></a>';
    });
    return html;
  }

  //格式化销量并返回
  function getSaleNum(saleNumber){
    var tenThousand = parseInt(saleNumber / 10000);
    if(tenThousand) 
      return 9999;
    var thouands = parseInt(saleNumber / 1000);
    if(thouands) 
      return thouands*1000;
    var hundred = parseInt(saleNumber / 100);
    if(hundred) 
      return hundred*100;
    return saleNumber;
  }

  // 返回店铺图片snippet
  function getShopLogoTmpl(imgSrc){
    return '<img class="shop-logo" src="'+ imgSrc +'">' +
            '</div><div class="shop-info">';
  }
  // 返回店铺名称snippet
  function getShopNameTmpl(name){
    return '<div class="shop-name">'+ name +'</div>'
  }
  // 返回店铺详细snippet
  function getShopDetailTmpl(score,saleNum,time,distance){
    var html = '';
    html += '<div class="shop-detail"><div class="shop-detail-left">';
    html +=     window.getStarScoreTmpl(score);
    html +=     '<span class="shop-rate">'+score+'</span>';
    html +=     '<span class="month-sale">月售'+saleNum+'+</span>';
    html +=  '</div><div class="shop-detail-right">';
    html +=     '<span class="delivery-time dividing-line">'+time+'</span>';
    html +=     '<span class="shop-distance dividing-line">'+distance+'</span>';
    html +=  '</div></div>';
    return html;
  }
  // 返会店铺价格snippet
  function getShopPriceTmpl(minPrice,feePrice,averagePrice){
    var html = '';
    html += '<div class="shop-price">';
    html +=   '<span class="dividing-line">'+minPrice+'</span>';
    html +=   '<span class="dividing-line">'+feePrice+'</span>';
    html +=   '<span class="dividing-line">'+averagePrice+'</span>';
    html += '</div>';
    return html;
  }
  // 返回店铺活动snippet
  function getShopActivityTmpl(discount){
    var html = '<div class="shop-activity">';            
    $(discount).each(function(i,v){
      html += '<p><img class="shop-activity-icon" src="'+v.icon_url+'">'+v.info+'</p>';
    })
    html += '</div>';
    return html;
  }


})($)