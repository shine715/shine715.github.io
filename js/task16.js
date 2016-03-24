/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


function addAqiData() {
	var City=document.getElementById('aqi-city-input').value;
  var Aqi=document.getElementById('aqi-value-input').value;

	aqiData.inputCity=City;
  aqiData.inputAqi=Aqi;

  console.log(aqiData);
  console.log(aqiData.inputCity);
}

/**
 * 渲染aqi-table表格
 */
var thead = true;
function renderAqiList() {

  var aqiTable= document.getElementById('aqi-table');

  var addTr = function(){
    var myTr = document.createElement('tr');
    var myTd1 = document.createElement('td');
    var myTd2 = document.createElement('td');
    var myTd3 = document.createElement('td');
    var OpBtn = document.createElement('button');
    addAqiData();
    myTd1.textContent = aqiData.inputCity;
    myTd2.textContent = aqiData.inputAqi;
    OpBtn.textContent = '删除';
    myTd3.appendChild(OpBtn);
    myTr.appendChild(myTd1);
    myTr.appendChild(myTd2);
    myTr.appendChild(myTd3); 
    aqiTable.appendChild(myTr);
  }
  if(thead){
    var myTr = document.createElement('tr');
    var myTd1 = document.createElement('td');
    var myTd2 = document.createElement('td');
    var myTd3 = document.createElement('td');
    myTd1.textContent = '城市';
    myTd2.textContent = '空气质量';
    myTd3.textContent = '操作';
    myTr.appendChild(myTd1);
    myTr.appendChild(myTd2);
    myTr.appendChild(myTd3); 
    aqiTable.appendChild(myTr);
    thead = false;
    addTr();
  } else {
    addTr();
  }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click',addBtnHandle);


  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();