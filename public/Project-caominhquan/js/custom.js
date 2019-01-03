var app = angular.module("myApp",["ngRoute","ngAnimate","angularUtils.directives.dirPagination"]);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    // .when("/chi-tiet/:so", {
    //     templateUrl : "index.html"
    // })
    // .when("/loai", {
    //    templateUrl : "loai.html",
    //    // controller: "loaiController"
    // })
    // .when("/sp", {
    //    templateUrl : "sp.html",
    //    // controller: "spController"
    // })
    // .when("/themsp", {
    //     templateUrl : "themsp.html"
    // })
    // .when("/themloai", {
    //     templateUrl : "themloai.html"
    // })
    // .when("/editproduct", {
    //     templateUrl : "editproduct.html"
    // })
    // .when("/edittype.html/", {
    //     templateUrl : "edittype.html"
    // })
    // .otherwise({ redirectTo: '/' });
}]);

app.controller("dataController",function($scope,$rootScope,$routeParams,$http){
    $rootScope.pageSize = 9;
    $rootScope.currentPage = 1;
    $scope.filters = { };
    $scope.model = {};
    // $rootScope.totalItems = 20;


    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    // $scope.searchFish   = '';     // set the default search/filter term


    $http.get('/all_product').
        then(function(result, status, headers, config) {
          $rootScope.products = result.data.data;
          console.log(result);
        });
    $http.get('/type').
      then(function(result, status, headers, config) {
        $rootScope.types = result.data.data;
      });
    $http.get('/user').
        then(function(result, status, headers, config) {
          $rootScope.users = result.data.data;
          // console.log(result);
        });
    $http.get('/shop_product').
      then(function(result, status, headers, config) {
        $rootScope.shops = result.data.data;
        console.log(result);
      });
      
    $http.get('/chi_tiet_product').
      then(function(result, status, headers, config) {
        $rootScope.ones = result.data.data;
        console.log(result);
      });

    $scope.qty_incr = function(item){
    item.quantity = item.quantity + 1;
}
$scope.qty_decr = function(item){
    if(item.quantity > 1){
       item.quantity = item.quantity - 1;
    }

}
    $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < shops.length; i++){
        var product = $scope.shops[i];
        total += (product.price * product.quantity);
    }
    return total;
}



      // $scope.propertyName = 'name';
      // $scope.reverse = true;
      // $scope.products = orderBy(products, $scope.propertyName, $scope.reverse);

      // $scope.sortBy = function(propertyName) {
      //   $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
      //       ? !$scope.reverse : false;
      //   $scope.propertyName = propertyName;
      //   $scope.products = orderBy(products, $scope.propertyName, $scope.reverse);
      // };
});

