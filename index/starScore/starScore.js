// starScore方法封装
// 生成starScoreHTML串
(function($){
  window.getStarScoreTmpl = function(score){
    if(!score) return '';
    var fullStarNum = parseInt(score / 1);
    var halfStarNum = score % 1 >= 0.5 ? 1 : 0;
    var noStarNum = 5 - fullStarNum - halfStarNum;

    var html = '<div class="starScore">';

    for(var i = 0;i < fullStarNum;i++){
      html += '<i class="star-item icon-fullstar"></i>';
    }
    if(halfStarNum) 
      html += '<i class="star-item icon-halfstar"></i>';
    if(noStarNum) 
      for(var i = 0;i < noStarNum;i++){
        html += '<i class="star-item icon-nostar"></i>';
      };
    html += '</div>';
    return html

  }
})($)