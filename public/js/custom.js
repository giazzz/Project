var app = angular.module("myApp",["ngRoute","ngAnimate"]);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "dashboard.html"
    })
    .when("/loai", {
       templateUrl : "loai.html",
       // controller: "loaiController"
    })
    .when("/sp", {
       templateUrl : "sp.html",
       // controller: "spController"
    })
    .when("/themsp", {
        templateUrl : "themsp.html"
    })
    .when("/themloai", {
        templateUrl : "themloai.html"
    })
    .when("/editproduct", {
        templateUrl : "editproduct.html"
    })
    .when("/edittype.html/", {
        templateUrl : "edittype.html"
    })
    .otherwise({ redirectTo: '/' });
}]);

app.controller("dataController",function($scope,$rootScope,$routeParams,$http){
    $http.get('/typeedit').
        then(function(result, status, headers, config) {
          $rootScope.edits = result.data.data;
        });
    $http.get('/productedit').
        then(function(result, status, headers, config) {
          $rootScope.productedit = result.data.data;
        });
    // $rootScope.hienthi = true;
    $rootScope.chuyen = function(doituong){
      doituong.hienthi = !doituong.hienthi;
    };

    // $http.get('/counttype').
    //     then(function(result, status, headers, config) {
    //       $rootScope.counttype = result.data;
    //     });
    // $http.get('/countproduct').
    //     then(function(result, status, headers, config) {
    //       $rootScope.countproduct = result.data;
    //     });
    $http.get('/all_product').
        then(function(result, status, headers, config) {
          $rootScope.products = result.data.data;
        });
    $http.get('/type').
      then(function(result, status, headers, config) {
        $rootScope.types = result.data.data;
      });
});


// app.controller("loaiController",function($scope,$rootScope,$routeParams,$http){
//     $http.get('/type').
//       then(function(result, status, headers, config) {
//         $rootScope.types = result.data.data;
//       });
// });
// app.controller("spController",function($scope,$rootScope,$routeParams,$http){
//     $http.get('/all_product').
//         then(function(result, status, headers, config) {
//           $rootScope.products = result.data.data;
//         });           
// });
