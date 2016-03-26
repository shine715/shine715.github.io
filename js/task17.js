/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

console.log(aqiSourceData);

var myArray = [];
var myDates = [];
for(i=0;i<91;i++){
  
  var d = new Date('2016-01-01');
  d.setDate(d.getDate() + i);
  myDates.push(getDateStr(d));
  // console.log(myDates);
  myArray.push(aqiSourceData['北京'][myDates[i]]);
}
console.log(myArray);
console.log(myDates);
// 用于渲染图表的数据
var chartData = {
  // aqiSourceData['北京']
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

//获取最大值，画出纵坐标坐标轴。
//   var max_value=0;
//   var values =[];
//   for(1=0;i<chartData.length;i++){
//     values[i]
//   }
//   for(var m=0;m
//       if(value[m]>max_value){
//           max_value=value[m];
//       }
//   }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
var redioPrev = [true,false,false];
function graTimeChange() {
  // 确定是否选项发生了变化 
  var dayRadio = document.getElementById('dayRadio');
  var weekRadio = document.getElementById('weekRadio');
  var monthRadio = document.getElementById('monthRadio');
  var graTimeRadios = document.querySelectorAll("#form-gra-time input");
  var change =false;
  for(i=0;i<graTimeRadios.length;i++){
    var redioCurr = (graTimeRadios[i].checked);
    if(redioCurr!==redioPrev[i]){
      redioPrev[i]=redioCurr;
      change=true;
    }
  }
  // console.log(change);
  // console.log('aaa');
  // console.log(redioPrev);
  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
var GraTimeForm = document.getElementById('form-gra-time');
function initGraTimeForm() {
  
  GraTimeForm.addEventListener('click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();