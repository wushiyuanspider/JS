/**
 * Created by Administrator on 2016/3/23.
 */
window.onload = function(){
    //alert();
    //表格对象
    var oTab = document.getElementById('tab');
    //console.log(oTab.tBodies[0].rows[0].cells);
    //tr 太重要了
    var tr = oTab.tBodies[0].rows;
    var oImputs = document.getElementsByClassName('check');
    //alert(oImputs.length);
    //选单个的
    var oSle = document.getElementsByClassName('cellselect');
    //全选
    var oAllsel = document.getElementsByClassName('check-all check');
    //数量输入框
    var oTxts = document.getElementsByClassName('txt');
    //alert(oTxts.length);
    //+
    var oAdd = document.getElementsByClassName('add');
    //合计
    var sleTol = document.getElementById('sleTol');
    //已选商品
    var oSleNum = document.getElementById('sleNum');
    //已选商品数量
    var selNum = parseInt(oSleNum.innerHTML.match(/\d/));


    //select-All and select-One
    for(var i = 0;i < oImputs.length; i ++){
        oImputs[i].checked = 'true';
        oImputs[i].onclick = function(){
            if(this.className == 'check-all check'){
                for(var j = 0;j < oImputs.length;j ++){
                    oImputs[j].checked = this.checked;
                    getTotalCount();
                }
            }
                if(!this.checked){
                    for(var i = 0;i < oAllsel.length;i ++){
                        oAllsel[i].checked = '';
                        getTotalCount();
                    }
                }
        };

    }

    //keyUp event
    for(var i = 0;i < tr.length;i ++){
        tr[i].onkeyup = function(){
            var cellNum = parseInt(this.getElementsByTagName('input')[1].value);
            //console.log(this.getElementsByTagName('input')[1]);
            //console.log(tr);
            if(isNaN(cellNum) || cellNum <= 0){
                cellNum = 1;
            }
            if(this.getElementsByTagName('input')[1].value !== cellNum){
                this.getElementsByTagName('input')[1].value = cellNum;
            }
            getCount(this);
            getTotalCount();
            //console.log(getTotalCount());
        }
    }

    //onclick events
    for(var i = 0;i < tr.length;i ++){
        tr[i].onclick = function(e){
            //var e = event || window.event;
            var e = window.event || e;
            var el = e.target || e.srcElement;
            switch (el.className){
                case 'add':
                    el.previousSibling.value++;
                    //getCount(this.parentNode.parentNode);
                    getCount(this);
                    //getTotalCount();
                    //console.log(this);
                    el.previousSibling.previousSibling.style.display = 'inline-block';
                    break;
                case 'reduce':
                    //while(el.nextSibling.value > 0){
                    if(el.nextSibling.value > 0){
                        el.nextSibling.value --;
                    }
                    getCount(this);

                    break;
                case 'del':
                    alert('确认要删除商品吗？');
                    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
                    getTotalCount();
                    break;
            }
            getTotalCount();
            //console.log(getTotalCount());先放着
            //console.log(this.id);

        };

    }
    //count算账
    function getCount(tr){
        var cell = tr.cells;
        //console.log(cell);
        var onePrice = cell[2].innerHTML;   //单价
        //var count = cell[4].innerHTML;      //小计
        var countInput = tr.getElementsByTagName('input')[1].value;  //数量
        cell[4].innerHTML = (parseInt(onePrice) * parseInt(countInput)).toFixed(2);
    }

    function getTotalCount(){
        //定义变量用于存储已选数量和合计
        var selectNum = 0;totalCount = 0;
        for(var i = 0;i < tr.length;i ++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                selectNum += parseInt(tr[i].getElementsByTagName('input')[1].value);
                totalCount += parseFloat(tr[i].cells[4].innerHTML);
                //totalCount = totalCount.toFixed(2);
            }
        }
        oSleNum.innerHTML = selectNum;
        sleTol.innerHTML = '合计：￥'+totalCount.toFixed(2);

    }

};