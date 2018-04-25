Handlebars.registerHelper('getWorkDays',  function(hireDate) {
  var arr = hireDate.split('-');
  var date = new Date(arr[1] + ' ' + arr[0] + ', ' + arr[2]);
  var workingDays = Math.floor((new Date() - date) / 86400000);
  if((new Date()).getHours() > 18) {
    workingDays++;
  }
  return workingDays;
});

Handlebars.registerHelper('getFormatedAdress', function(adress) {
  var result = '';
  var arr = adress.split(',');
  result = arr[2].trim() + ', ' + arr[3].trim() + ', ' + arr[4].trim() + ', ' + arr[6].trim() ;
  return result;
});