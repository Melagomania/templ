var xhr = new XMLHttpRequest();
var studentsData;
xhr.open('GET', 'data/data.json', false);
xhr.send();
if (xhr.status != 200) {
  throw new Error(xhr.status + ': ' + xhr.statusText);
} else {
  jsonData = JSON.parse(xhr.responseText); 
}

var header = [
  {text: 'Handlebars', href: '#'},
  {text: 'Dust', href: '#'},
  {text: 'Lodash', href: '#'}
]

var headerWrapper = document.getElementsByTagName('header')[0];
var headerHtml = getHtmlFromTemplate('header-template', header);
headerWrapper.innerHTML = headerHtml;

var popupContainer = document.getElementsByClassName('popup-container')[0];
var profileCardsContainer = document.getElementsByClassName('profile-items')[0];

var profileCardsHtml = getHtmlFromTemplate('profile-card-template', jsonData);
document.getElementsByClassName('profile-items')[0].innerHTML = profileCardsHtml;

Handlebars.registerHelper('getWorkingDate', getWorkingDate);
Handlebars.registerHelper('getFormatedAdress', getFormatedAdress);

var showPopupBtns = document.getElementsByClassName('show-popup-btn');
for(var i = 0; i < showPopupBtns.length; i++) {
  showPopupBtns[i].addEventListener('click', function(e) {
    if(e.target.getAttribute('data-toggle') === "modal") {
      var id = e.target.getAttribute('data-id');
      var employeeObj = findEmployeeById(id);
      var html = getHtmlFromTemplate('popup-template', employeeObj);
      popupContainer.innerHTML = html;
    }
  });
}

function getHtmlFromTemplate(sourceId, data) {
  var src = document.getElementById(sourceId).innerHTML;
  var template = Handlebars.compile(src);
  var html = template(data);
  return html;
}

function findEmployeeById(id) {
  for(var i in jsonData) {
    if(jsonData[i].employeeId === id) {
      return jsonData[i];
    }
  }
}

function getWorkingDate(hireDate) {
  var arr = hireDate.split('-');
  var date = new Date(arr[1] + ' ' + arr[0] + ', ' + arr[2]);
  var now = new Date();
  var workingDays = Math.floor((now - date) / 86400000);
  return workingDays;
}

function getFormatedAdress(adress) {
  var result = '';
  var arr = adress.split(',');
  result = arr[2].trim() + ', ' + arr[3].trim() + ', ' + arr[4].trim() + ', ' + arr[6].trim() ;
  return result;
}