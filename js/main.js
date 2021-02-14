layui.config({
	base : "js/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		$ = layui.jquery;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})
	
	
	//动态获取任务情况
	$.getJSON("../json/worksList.json",
		function(data){
			var waitNews = [];
			var outtimeNews = [];
			var finishNews = [];
			/* $(".allNews span").text(data.length);  //任务总数 */
			for(var i=0;i<data.length;i++){
				var newsStr = data[i];
				if(newsStr["newsStatus"] == "待完成"){
					waitNews.push(newsStr);
				}else if(newsStr["newsStatus"] == "已拖期"){
					outtimeNews.push(newsStr);
				}else{
					finishNews.push(newsStr);
				}
			}
			
			$(".outtimeNews span").text(outtimeNews.length);  //拖期任务
			$(".finishNews span").text(finishNews.length);  //完成任务
			$(".waitNews span").text(waitNews.length);  //待审核任务
			//加载最新任务动态
			
			var hotNewsHtml = '';
			for(var i=0;i<5;i++){
				hotNewsHtml += '<tr>'
		    	+'<td align="left">'+data[i].newsName+'</td>'
		    	+'<td>'+data[i].newsTime+'</td>'
		    	+'</tr>';
			}
			$(".hot_news").html(hotNewsHtml);
		}
	)

	

	//数字格式化
	$(".panel span").each(function(){
		$(this).html($(this).text()>9999 ? ($(this).text()/10000).toFixed(2) + "<em>万</em>" : $(this).text());	
	})

	
})
