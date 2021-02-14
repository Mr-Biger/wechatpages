var DETIALID; //给子页面传参

layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

 
	async function get_db(){
		//渲染数据
		
		let values = await eel.get_XTBJ_data()();
		console.log(values);
		
		let titles = await eel.get_BJ_titles()();
		
		var title = JSON.parse(titles);
		var data = JSON.parse(values);
		//top.layer.msg(data[0]['型号']);
		//top.layer.msg(data.length);
		var titleHtml='';
		
		for(var i=0;i<title.length;i++){
					titleHtml += '<th>'+title[i]+'</th>';
				}
				
		titleHtml+='<th>操 作</th>';
		
		var valuseHtml='';
		
		for(var i=0;i<data.length;i++){
			valuseHtml+='<tr>';
			for(var j=0;j<title.length;j++){
				valuseHtml+= '<td>'+data[i][title[j]]+'</td>';
			}
			valuseHtml += '<td><a class="layui-btn layui-btn-mini news_edit" data-id="'+i+'"><i class="layui-icon icon-edit"> 详 情</a></td></tr>';
		}
		
/* 		$.each(data,function(i,newImage){
					//top.layer.msg(newImage.imageClass);
					if(newImage.imageClass==$("#searchInfo option:selected").text()){
						newsData=newImage.imageInfo;
					}
					}); */
		//top.layer.msg(valuseHtml);
		
		$(".db_titles").html(titleHtml);
		$(".db_valuse").html(valuseHtml);
		
	}
	
    QueryString();
    
	//构造参数对象并初始化 
    function QueryString(){
        console.log('QueryString');
        var name,value,i;
        var values=[]; 
        var str=location.href;//获得浏览器地址栏URL串 
        var num=str.indexOf("?") 
        str=str.substr(num+1);//截取“?”后面的参数串 
        var arrtmp=str.split("&");//将各参数分离形成参数数组 
        for(i=0;i < arrtmp.length;i++)
        { 
            num=arrtmp[i].indexOf("="); 
            if(num>0)
            { 
                name=arrtmp[i].substring(0,num);//取得参数名称 
                value=arrtmp[i].substr(num+1);//取得参数值 
                //this[name]=value;//定义对象属性并初始化 
                values.push([name,value]);
            }
        }
        console.log(values);
        if(values.length>0){
            parserPage(values);
        }
    } 
	
	function parserPage(values){
	    console.log('parserpages');
        var valuseHtml='';
        
        //var values=[['撕得粉碎当1','https://www.baidu.com'],['撕得粉碎当2','https://www.baidu.com'],['撕得粉碎当3','https://www.baidu.com']];
        
        
        for(var i=0;i<values.length;i++){
                    valuseHtml+='<tr>';
			        valuseHtml += '<td>'+i+'</td>';
			        valuseHtml += '<td>'+values[i][0]+'</td>';
			        valuseHtml += '<td>'+values[i][1]+'</td>';
			        valuseHtml += '<td><a class="layui-btn layui-btn-mini news_edit" data-id="'+i+'"><i class="layui-icon icon-edit">复制链接</a></td>';
			        valuseHtml+='</tr>';
		        }
	    
		$(".db_valuse").html(valuseHtml);
	}
	
	//parserPage();
	
	
	//点击详情进入部件详情页面
	$("body").on("click",".news_edit",function(){  //编辑
		var _this = $(this);
		//layer.alert(_this.attr("data-id"),{icon:6, title:'任务编辑'});
		DETIALID=_this.attr("data-id");
		
		//top.layer.msg(DETIALID);
		var index = layui.layer.open({
			title : "关键部件详情数据",
			type : 2,
			content : "detial.html",
			success : function(layero, index){
				/* layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				}); */
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
		
		
	})
 	
})
