Handlebars.registerHelper('getWorkDays',  function(hireDate) {
  var arr = hireDate.split('-');
  var date = new Date(arr[1] + ' ' + arr[0] + ', ' + arr[2]);
  var workingDays = Math.floor((new Date() - date) / 86400000);
  if((new Date()).getHours() > 18) {
    workingDays++;
  }
  return workingDays;
});

Handlebars.registerHelper('getFormatedaddress', function(address) {
  var arr = address.split(',');
  return arr[2].trim() + ', ' + arr[3].trim() + ', ' + arr[4].trim() + ', ' + arr[6].trim() ;
});

Handlebars.registerPartial(
  'employeeUpsaLink',
  '<a class="employee-upsa-link" href="https://upsa.epam.com/workload/employeeView.do?employeeId={{employeeId}}"><i class="fa fa-child"></i></a>'
);