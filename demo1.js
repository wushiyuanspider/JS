window.onload=function(){

    var list = document.getElementById('list');
    var boxs = list.children;
    var oPraiseNum = document.getElementsByClassName('praises-total');
    for(var i=0;i<boxs.length;i++){
  	    boxs[i].onclick=function(e){
  	    //兼容
  	        var e = e || window.event;
            var el = e.target || e.srcElement;
            switch(el.className){
       	      case 'close':
       	          delBox(el.parentNode);
       	          break;
                case 'praise':
                    praiseAD(el);
                    break;
                case 'comment-praise':
                    myPraise(el);
                        break;
                case 'comment-operate':
                    commentOperate(el);
                        break;
                case 'comment':
                    replyComment(el);
                        break;
                case 'btn':
                    subComment(el);
                    break;
                case 'fixed':
                    rrText(el);
                    break;
                case 'btnFixed':
                    replyReply(el);
                    break;
                }
  	    }
    }

    //评论输入计数
    var oTxts = document.getElementsByTagName('textarea');
    //alert(oTxts.length);
    for(var i = 0;i < oTxts.length;i ++){
        oTxts[i].onkeyup = function(){
            this.parentNode.children[2].children[0].innerHTML = areaNum(this);
        };
        oTxts[i].onblur = function(){
            this.parentNode.children[2].children[0].innerHTML = areaNum(this);
        }
    }

    //文本输入框的计数功能
    function areaNum(obj){
        //已输入的字符数
        var len;
        if(obj.value.length >= 140){
            //取140以内的字符
            obj.value = obj.value.substr(0, 140);
            len = 140;
        }else{
            len = obj.value.length;
        }
        return len;
    }
    //====================

    function delBox(el){
        el.parentNode.removeChild(el);
    }
    //点赞
    function praiseAD(el){
            //alert(el.nextSibling.nextSibling.className);
            switch (el.innerHTML){
                case '赞':
                    el.parentNode.nextSibling.nextSibling.style.display = 'block';
                    while(!el.parentNode.nextSibling.nextSibling.innerHTML.match('我')){
                        el.parentNode.nextSibling.nextSibling.innerHTML = '我 '+el.parentNode.nextSibling.nextSibling.innerHTML;
                        el.parentNode.nextSibling.nextSibling.className = 'praises-total';
                        //alert('tag');
                    }
                    el.innerHTML = '取消赞';
                    break;
                case '取消赞':
                    //alert('aaa');
                    el.innerHTML = '赞';
                    el.parentNode.nextSibling.nextSibling.style.display = 'none';
            }
    }
    //赞我
    function myPraise(el){
        el.innerHTML = '1 赞';
    }
    //评论处理
    function commentOperate(el){
        switch(el.innerHTML){
            case '删除':
                var elGp = el.parentNode.parentNode.parentNode.parentNode;
                elGp.removeChild(elGp.children[0]);
                break;
            case '回复':
                var oTxt = document.createElement('textarea');
                oTxt.className = 'fixed';
                oTxt.style.marginLeft = '40px';
                //alert(el.parentNode.previousSibling.previousSibling.children[0].className);
                oTxt.placeholder = '回复'+el.parentNode.previousSibling.previousSibling.children[0].innerHTML+'...';
                var oBtn = document.createElement('button');
                oBtn.innerHTML = '提交';
                oBtn.className = 'btnFixed';
                oTxt.style.width = '400px';
                var gfNode = el.parentNode.parentNode.parentNode;
                //alert(gfNode.className);
                gfNode.appendChild(oTxt);
                gfNode.appendChild(oBtn);
                break;
        }
    }
    function replyComment(el){
        el.style.height = '45px';
        el.parentNode.children[1].style.display = 'block';
        el.parentNode.children[2].style.display = 'block';
    }
    function subComment(el){
        if(el.parentNode.children[0].value.length <= 140 && el.parentNode.children[0].value.length > 0){
            //alert('评论成功！');
            var oP = document.createElement('p');
            oP.className = 'comment-content';
            //oP.innerHTML = '<span style="color: #336699">我</span>：'+el.previousSibling.previousSibling.value;
            var addComment = el.previousSibling.previousSibling.value;
            //alert(addComment);
            oP.innerHTML = '<div class="comment-list"><div class="comment-box clearfix" user="self"><img class="myhead" src="images/my.png" alt=""/><div class="comment-content"><p class="comment-text"><span class="user">我：</span>'+addComment+'。</p><p class="comment-time">2014-02-19 14:36<a href="javascript:;" class="comment-praise" total="1" my="0" style="display: inline-block">赞</a><a href="javascript:;" class="comment-operate">删除</a></p></div></div></div>';
            var gfNode = el.parentNode.previousSibling.previousSibling.parentNode;
            gfNode.insertBefore(oP,el.parentNode);
            el.parentNode.children[0].style.height = '15px';
            el.parentNode.children[0].value = '评论...';
            el.parentNode.children[2].style.display = 'none';
            el.style.display = 'none';
        }else{
            alert('请输入内容')
        }
    }

    function rrText(){
        //alert('aa');
    }
    function replyReply(el){
        //alert('a');
        el.previousSibling.parentNode.removeChild(el.previousSibling.parentNode.children[2]);
        var oTxt = document.createElement('p');
        oTxt.innerHTML = '<p style="margin-left: 40px;" class="comment-text"><span class="user">我：</span>这里没写完</p><p style="margin-left: 40px;" class="comment-time">2014-02-19 14:36</p>';
        el.parentNode.insertBefore(oTxt, el);
        //el.style.display = 'none';
    }
};