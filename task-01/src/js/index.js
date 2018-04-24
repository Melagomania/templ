var xhr = new XMLHttpRequest();
var studentsData;
xhr.open('GET', 'data/data.json', false);
xhr.send();
if (xhr.status != 200) {
  throw new Error(xhr.status + ': ' + xhr.statusText);
} else {
  jsonData = JSON.parse(xhr.responseText); 
}

var src = document.getElementById('entry-template').innerHTML;
var template = Handlebars.compile(src);
var html = template(context);
document.getElementById('main-container').innerHTML = html;