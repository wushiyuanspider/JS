/*create by wushiyuan on 2016/4/5*/
onload = function () {
    var serc = document.getElementById('search');
    var classSearch = document.getElementById('classSearch');
    var bookName = document.getElementsByName('bookName')[0];
    var classify = document.getElementsByName('classify')[0];
    var press = document.getElementsByName('press')[0];
    var price = document.getElementsByName('price')[0];
    var remark = document.getElementsByName('remark')[0];
    var add = document.getElementsByName('add')[0];
    var oTab = document.getElementById('test');
    var id =  oTab.tBodies[0].rows.length + 1;
    //定义全局变量，防止第三次修改后取消回到第一次修改前的状态。
    var bN, cF, pR, pri, inf;
    add.onclick = function () {
        var oTr = document.createElement('tr');
        addTd(oTr,id ++);
        addTd(oTr,bookName.value);
        addTd(oTr,classify.value);
        addTd(oTr,press.value);
        addTd(oTr,price.value);
        addTd(oTr,remark.value);
        addTd(oTr,'<a href="javascript:">修改</a><a href="javascript:">删除</a>');
        //修改或确认
        oTr.getElementsByTagName('a')[0].onclick = function () {
            //可以同过按钮值来确定单元格里面的内容
            switch (this.innerHTML){
                case '修改':
                    this.innerHTML = '确定';
                    this.nextElementSibling.innerHTML = '取消';
                    addTds = this.parentNode.parentNode.getElementsByClassName('addTd');
                    addTds[1].innerHTML = '<input type="text" value="'+addTds[1].innerHTML+'" id="bookNameF" name="bookName">';
                    addTds[2].innerHTML = '<select value="'+addTds[2].innerHTML+'" id="classifyF" name="classify">'+
                        '<option value="小说">小说</option>'+
                        '<option value="文学">文学</option>'+
                        '<option value="传记">传记</option>'+
                        '<option value="艺术">艺术</option>'+
                        '<option value="少儿">少儿</option>'+
                        '</select>';
                    addTds[3].innerHTML = '<input type="text" value="'+addTds[3].innerHTML+'" id="pressF" name="press">';
                    addTds[4].innerHTML = '<input type="text" value="'+addTds[4].innerHTML+'" id="priceF" name="price">';
                    addTds[5].innerHTML = '<input type="text" value="'+addTds[5].innerHTML+'" id="remarkF" name="remark">';
                    break;
                case '确定':
                    //
                    this.innerHTML = '修改';
                    this.nextElementSibling.innerHTML = "删除";
                    // console.log(oTab);
                    var bookNameFix = document.getElementById('bookNameF');
                    var classifyFix = document.getElementById('classifyF');
                    var pressFix = document.getElementById('pressF');
                    var priceFix = document.getElementById('priceF');
                    var remarkFix = document.getElementById('remarkF');
                    bN = addTds[1].innerHTML = bookNameFix.value;
                    cF = addTds[2].innerHTML = classifyFix.value;
                    pR = addTds[3].innerHTML = pressFix.value;
                    pri = addTds[4].innerHTML = priceFix.value;
                    inf = addTds[5].innerHTML = remarkFix.value;
                    break;
            }
        };
        //删除或取消
        oTr.getElementsByTagName('a')[1].onclick = function () {
            switch (this.innerHTML){
                case '删除':
                    var info = confirm('确认删除吗？')
                    if(info == true){
                        oTab.tBodies[0].removeChild(this.parentNode.parentNode);
                    }
                    break;
                case '取消':
                    this.innerHTML = '删除';
                    this.previousSibling.innerHTML = '修改'
                    var addTd = this.parentNode.parentNode.getElementsByClassName('addTd');
                    addTd[1].innerHTML = bN;
                    addTd[2].innerHTML = cF;
                    addTd[3].innerHTML = pR;
                    addTd[4].innerHTML = pri;
                    addTd[5].innerHTML = inf;
                    break;
            }
        };
        oTab.tBodies[0].appendChild(oTr);
    };
    //创建单元格
    function addTd(tr,val) {
        var oTd = document.createElement('td');
        oTd.innerHTML = val;
        oTd.className = 'addTd';
        tr.appendChild(oTd);
    }
    //查询
    serc.onclick = function () {
        var classifies = document.getElementsByClassName('addTd');
        console.log(classifies);
        for(var i = 0;i <classifies.length;i ++ ){
            if(classSearch.value == classifies[i].innerHTML){
                classifies[i].parentNode.style.backgroundColor = 'pink';
            }
        }
    }
};