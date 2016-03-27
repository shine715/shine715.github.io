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

var dayArray = [];
var weekArray = [];
var tempDayArray = [];
var monthArray = [];
var tempMonthArray = [];
var myDates = [];

console.log(tempDayArray);
console.log(dayArray);
console.log(weekArray);
console.log(monthArray);

// 用于渲染图表的数据
var chartData = {
  // aqiSourceData['北京']

  // return myArray;--日
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
var canvas = document.getElementById('aqiCanvas');
var ctx;
// var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
//日图

function renderDayChart() {
  ctx = canvas.getContext('2d');
  // ctx.clearRect(0,0,1000,500);
  var width = canvas.width;
  var height = canvas.height;
  canvas.width = width;
  canvas.height = height;
  ctx.lineWidth=10;
  var color;
  for(i=0;i<dayArray.length;i++){
    ctx.beginPath();
    ctx.moveTo(5+i*11,500);
    ctx.lineTo(5+i*11,500-dayArray[i]);
    color=Math.floor(Math.random() * 0xFFFFFF).toString(16);
    console.log(color);
    ctx.strokeStyle=  '#'+color;
    
    ctx.stroke();
    ctx.closePath();

    
  };
}

//周图
function renderWeekChart() {
  // ctx.clearRect(0,0,1000,500);
  var width = canvas.width;
  var height = canvas.height;
  canvas.width = width;
  canvas.height = height;
  ctx.lineWidth=50;
  for(i=0;i<weekArray.length;i++){
    ctx.moveTo(25+i*51,500);
    ctx.lineTo(25+i*51,500-weekArray[i]);
    ctx.stroke();
  };
}

//月图
function renderMonthChart() {
  // ctx.clearRect(0,0,1000,500);
  var width = canvas.width;
  var height = canvas.height;
  canvas.width = width;
  canvas.height = height;
  ctx.lineWidth=200;
  for(i=0;i<monthArray.length;i++){
    ctx.moveTo(100+i*201,500);
    ctx.lineTo(100+i*201,500-monthArray[i]);
    ctx.stroke();
  };
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
  console.log(redioPrev);
  // 设置对应数据
  // 确定渲染日、周、月图表，还是不渲染
  if(change){
    switch(redioPrev.toString()) {
      case 'false,true,false':
          console.log('画周图')
          renderWeekChart(); 
          break;
      case 'false,false,true':
          console.log('画月图')
          renderMonthChart();
          break;
      default:
          console.log('画日图')
          renderDayChart();
    }
  } else {
    console.log('没变化')
    console.log(change);
  }

  // 调用图表渲染函数
  
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
  for(i=0;i<91;i++){
    var d = new Date('2016-01-01');
    d.setDate(d.getDate() + i);
    myDates.push(getDateStr(d));

  //每一个日数据都push进日数据array
    dayArray.push(aqiSourceData['北京'][myDates[i]]); 
  //按自然周push进tempArray,每到一周再算temArray的平均数，并push进weekArray
    tempDayArray.push(aqiSourceData['北京'][myDates[i]]);
    if(d.getDay()==6){
      var sum = 0;
      for(n=0;n<7;n++){
        if(tempDayArray[n]){
          sum+=tempDayArray[n];
        }
      };
      var avg = sum/tempDayArray.length;
      weekArray.push(avg);
      tempDayArray = [];
    };
  //按自然月push进tempArray,每到一月再算temArray的平均数，并push进monthArray
    tempMonthArray.push(aqiSourceData['北京'][myDates[i]]);
    if(d.getDate()==1){
      var sum = 0;
      for(n=0;n<tempMonthArray.length-1;n++){
        if(tempMonthArray[n]){
          sum+=tempMonthArray[n];
        };
      };
      var avg = sum/(tempMonthArray.length-1);
      monthArray.push(avg);
      tempMonthArray = [];
    };
  };
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