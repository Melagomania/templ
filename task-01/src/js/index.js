var headerWrapper = document.getElementById('header');
var profileCardsWrapper = document.getElementById('profile-items');
var popupContainer = document.getElementById('popup-container');

var employeesData;
var headerData = [
  {text: 'Handlebars', href: '#'},
  {text: 'Dust', href: '#'},
  {text: 'Lodash', href: '#'}
]

httpGet('data/data.json')
  .then(
    function(response) {
      employeesData = JSON.parse(response);
      renderTemplate(headerWrapper, 'header-template', headerData);
      renderTemplate(profileCardsWrapper, 'profile-card-template', employeesData);
      profileCardsWrapper.addEventListener('click', handleClick);
    }
  );

function handleClick(event) {
  if(event.target.getAttribute('data-toggle') === "modal") {
    var id = event.target.getAttribute('data-id');
    var employeeObj = findEmployeeById(id);
    renderTemplate(popupContainer, 'popup-template', employeeObj);
  }
}
function renderTemplate(parrentEl, sourceTemplateId, context) {
  var src = document.getElementById(sourceTemplateId).innerHTML;
  var html = getHtmlFromTemplate(src, context);
  parrentEl.innerHTML = html;
}

function getHtmlFromTemplate(src, context) {
  var template = Handlebars.compile(src);
  var html = template(context);
  return html;
}

function findEmployeeById(id) {
  for(var i in employeesData) {
    if(employeesData[i].employeeId === id) {
      return employeesData[i];
    }
  }
}

function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(xhr.responseText);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.send();
  });
}