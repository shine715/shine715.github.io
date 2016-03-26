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

var aqiTable = document.getElementById('aqi-table')
var cityInput = document.getElementById('aqi-city-input');
var aqiInput = document.getElementById('aqi-value-input');
var msgCity = document.createElement('span');
var msgAqi = document.createElement('span');
cityInput.parentNode.appendChild(msgCity);
aqiInput.parentNode.appendChild(msgAqi);


// function checkInputIsNull(){
//   if(cityInput.value.length=0)
// };

//检查用户输入是否符合规范
function checkCityInput(){
  if(!isNaN(cityInput.value)){
    msgCity.textContent='请输入中文或英文字符,如果你输入了日期我也看不出来，但是请不要欺骗我';
    return false;
  } else{
    msgCity.textContent='';
    return true;
  }
}

function checkAqiInput(){
  if(isNaN(aqiInput.value)||aqiInput.value.length===0){
     msgAqi.textContent='请输入数字';
     return false;
  } else{
    msgAqi.textContent='';
    return true;
  }
}

function addAqiData() {
	aqiData.city=cityInput.value.trim();
  aqiData.aqi=aqiInput.value.trim();
}

/**
 * 渲染aqi-table表格
 */
var thead = true;
function renderAqiList() {
  // var aqiTable= document.getElementById('aqi-table');
  if(cityInput.value.length*aqiInput.value.length===0||!checkCityInput()||!checkAqiInput()){
    console.log('invalid input, cannot render table');
    console.log(cityInput.value.length);
    console.log(aqiInput.value.length);
    console.log(checkCityInput());
    console.log(checkAqiInput());
  } else {
    var addTr = function(){
      var myTr = document.createElement('tr');
      var myTd1 = document.createElement('td');
      var myTd2 = document.createElement('td');
      var myTd3 = document.createElement('td');
      var OpBtn = document.createElement('button');
      addAqiData();
      myTd1.textContent = aqiData.city;
      myTd2.textContent = aqiData.aqi;
      OpBtn.textContent = '删除';
      myTd3.appendChild(OpBtn);
      myTr.appendChild(myTd1);
      myTr.appendChild(myTd2);
      myTr.appendChild(myTd3); 
      aqiTable.appendChild(myTr);
      msgCity.textContent='';
      msgAqi.textContent='';
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
    cityInput.value='';
    aqiInput.value='';
  }
}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  // checkInputIsNull();
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

function getTarget(e){
  if(!e){
    e = window.event;
  }
  return e.target || e.srcElement;
}

function delBtnHandle(e) {
  var target, elParent, elGrandparent;
  target = getTarget(e);  //btn
  elParent = target.parentNode;   //td
  elGrandparent = target.parentNode.parentNode;   //tr
  aqiTable.removeChild(elGrandparent);
}

function init() {
  
  if (cityInput.addEventListener){
    cityInput.addEventListener('blur',function(e){
      checkCityInput(e);
    })
  } else {
    cityInput.attachEvent('blur',function(e){
      checkCityInput(e);
    })
  }
  if (aqiInput.addEventListener){
    aqiInput.addEventListener('blur',function(e){
      checkAqiInput(e);
    })
  } else {
    aqiInput.attachEvent('blur',function(e){
      checkAqiInput(e);
    })
  }
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.addEventListener('click',addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  if (aqiTable.addEventListener){
    aqiTable.addEventListener('click',function(e){
      delBtnHandle(e);
    })
  } else {
    aqiTable.attachEvent('onclick',function(e){
      delBtnHandle(e);
    })
  }
}

init();