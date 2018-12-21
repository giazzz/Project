var app = angular.module("myApp",["ngRoute","ngAnimate"]);


app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "dashboard.html"
    })
    .when("/loai", {
       templateUrl : "loai.html",
       controller: "loaiController"
    })
    .when("/sp", {
       templateUrl : "sp.html",
       controller: "spController"
    })
    .otherwise({ redirectTo: '/' });
}]);

app.controller("dataController",function($scope,$rootScope,$routeParams,$http){

});


app.controller("loaiController",function($scope,$rootScope,$routeParams,$http){
            $http.get('/type').
                then(function(result, status, headers, config) {
                  console.log('da get api');
                  console.log(result);
                  $rootScope.types = result.data.data;
                });

});

app.controller("spController",function($scope,$rootScope,$routeParams,$http){
            $http.get('/all_product').
                then(function(result, status, headers, config) {
                  // console.log('da get api');
                  // console.log(result);
                  $rootScope.products = result.data.data;
                });
  var dataFromMogo = "http://localhost:3003/all_product";

  $scope.chuyen = function(doituong){
      doituong.hienra = !doituong.hienra;
  };
      // ham nut save
      $scope.sua = function(doituong){
        doituong.hienra = !doituong.hienra;
      //lay du tu form
      var dulieucansua = $.param({
          id:doituong.id,
          name:doituong.name,
          price:doituong.price,
          type:doituong.type,
          desc:doituong.desc,
          comment:doituong.comment,
          rating:doituong.rating,
          image_link:doituong.image_link
      });
      console.log(dulieucansua);
      var urlAPI = 'http://localhost:3003/sua-products';
      var config ={
        headers:{
          'content-type':'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
      $http.post(urlAPI,dulieucansua,config)
      .then(function(res){
          console.log(res.data);
      },function(er){
          console.log(er.data);
      })
      //luu vao CSDL
      // $http.post(dataFromMogo,dulieucansua,{headers:{
      //   'content-type':'application/x-www-form-urlencoded;charset=utf-8'
      // }}).then(function(res){
      //     console.log(res.data);
      // },function(er){

      // })
  };            
});
