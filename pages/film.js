var DETIALID; //给子页面传参

function copyToClip(Url2){
    
    console.log(Url2);
    //var Url2=document.getElementById("biao1").innerText;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
    alert('复制成功,粘贴到浏览器中查看.');
}

layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;
    
    //init
    QueryString();
    
    //调用api
    function get_aliyun_db(keword) {
        if(keword != undefined){
            var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
            var url='https://1411798630716076.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/Wechat/BigMove/wechat?q=';        
            url += keword;
            httpRequest.open('GET', url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
            httpRequest.send();//第三步：发送请求  将请求参数写在URL中
            /**
             * 获取数据后的处理程序
             */
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var json = httpRequest.responseText;//获取到json字符串，还需解析
                    var pagevalues = JSON.parse(json);
                    console.log(pagevalues);
                    //return pagevalues;
                    //渲染页面
                    if(pagevalues.subjects.length>0){
                        parserPage(pagevalues.subjects);
                    } else{
                        var valuseHtml='没有找到【'+keword+'】相关资源,换一个试试吧';
                        $(".db_valuse").html(valuseHtml);
                    }
                }
            }
        }

    }
    

	//构造参数对象并初始化 
    function QueryString(){
        ///console.log('QueryString');
        var name,value,i;
        var values=[]; 
        var str=location.href;//获得浏览器地址栏URL串 
        var num=str.indexOf("?") 
        str=str.substr(num+3);//截取“?”后面的参数串 
        /*
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
        //console.log(values);
        if(values.length>0){
            get_aliyun_db(values);
        }
        */
        //console.log(str);
        get_aliyun_db(str);
    } 
	
	function parserPage(values){
	    //console.log('parserpages');
        var valuseHtml='';
                
        for(var i=0;i<values.length;i++){
                    valuseHtml+='<tr><td>';
			        valuseHtml += '<p><b>'+values[i].title+'</b></p>';
			        valuseHtml += '<img src="'+values[i].images.large+'" width="200" />';
			        valuseHtml += '<p>';
			        var links = values[i].links;
			        var linksArr = links.split("$$$");
			        for(var j=0;j<linksArr.length;j++){
			            link=linksArr[j];
			            if(link.indexOf("m3u8")==-1){
			                var urlArr=link.split("#");
			                for(var k=0;k<urlArr.length;k++){
			                    var linkArr=urlArr[k].split("$");
			                    valuseHtml += '<div><input type="button" onClick="copyToClip(\''+linkArr[1]+'\')" value= '+linkArr[0]+'点我复制链接 ></div>';			                
			                }

			            }
			        
			        }
			        valuseHtml += '</p>';
			        
			        //valuseHtml += '<td>'+values[i].links+'</td>';
			        //valuseHtml += '<td><img src="'+values[i].images.large+'"></td>';
			        //valuseHtml += '<td><a class="layui-btn layui-btn-mini news_edit" data-id="'+i+'"><i class="layui-icon icon-edit">复制链接</a></td>';
			        //valuseHtml += '<td><button onclick="copyToClip("'+values[i].images.large+'")"> Copy </button></td>';
			        
			        
			        valuseHtml+='</td></tr>';
		        }
	    console.log(valuseHtml);
		$(".db_valuse").html(valuseHtml);
	}
	
	
	
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
