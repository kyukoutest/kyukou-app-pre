var kyukouApp=angular.module("kyukouApp",["kyukouApp.filters","ui.bootstrap"]);kyukouApp.factory("eventList",["$http","$q",function(a,b){var c=b.defer();return b.all([a.get("//kyukou-kyudai.rhcloud.com/api/1/events/list.json")]).then(function(a){for(var b=a[0].data,d=[],e=[],f=0;f<b.length;f++)b[f].raw=b[f].raw.replace(/\s+/g," "),b[f].eventDate=new Date(b[f].eventDate),b[f].datetime=b[f].eventDate.toISOString(),b[f].dateformatted=b[f].eventDate.getFullYear()+"年"+(b[f].eventDate.getMonth()+1)+"月"+b[f].eventDate.getDate()+"日（"+["日","月","火","水","木","金","土"][b[f].eventDate.getDay()]+")",-1===d.indexOf(b[f].about)&&d.push(b[f].about),-1===e.indexOf(b[f].department.match(/^\S*学部/)[0])&&e.push(b[f].department.match(/^\S*学部/)[0]);c.resolve({events:b,abouts:d.sort(),departments:e.sort()})},function(a){c.reject(a)}),c.promise}]),kyukouApp.controller("eventListCtrl",["$scope","eventList",function(a,b){a.isCollapsed=!0,a.ctrlTmpl="kyukou-loading",a.error=null,b.then(function(b){a.events=b.events,a.abouts=b.abouts,a.departments=b.departments,a.ctrlTmpl="kyukou-app",a.error=null},function(b){a.error={status:b.status}}),a.selectedAbouts=[],a.setSelectedAbouts=function(){var b=this.about,c=a.selectedAbouts.indexOf(b);-1!==c?a.selectedAbouts.splice(c,1):a.selectedAbouts.push(b)},a.isSelectedAbout=function(b){return-1!==a.selectedAbouts.indexOf(b)},a.selectedDepartments=[],a.setSelectedDepartments=function(){var b=this.department,c=a.selectedDepartments.indexOf(b);-1!==c?a.selectedDepartments.splice(c,1):a.selectedDepartments.push(b)},a.isSelectedDepartment=function(b){return-1!==a.selectedDepartments.indexOf(b)},a.sort={col:"datetime",desc:!1},a.setSorting=function(b){var c=a.sort;c.col===b?c.desc=!c.desc:(c.col=b,c.desc=!1)},a.isSortedCol=function(b){return a.sort.col===b}}]);var kyukouAppFilters=angular.module("kyukouApp.filters",[]);kyukouAppFilters.filter("aboutFilter",[function(){return function(a,b){if(!angular.isUndefined(a)&&!angular.isUndefined(b)&&b.length>0){var c=[];return angular.forEach(b,function(b){angular.forEach(a,function(a){angular.equals(a.about,b)&&c.push(a)})}),c}return a}}]),kyukouAppFilters.filter("departmentFilter",[function(){return function(a,b){if(!angular.isUndefined(a)&&!angular.isUndefined(b)&&b.length>0){var c=[];return angular.forEach(b,function(b){angular.forEach(a,function(a){angular.equals(a.department.match(/^\S*学部/)[0],b)&&c.push(a)})}),c}return a}}]);