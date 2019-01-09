var app = angular.module("myApp",["ngRoute","ngAnimate","angularUtils.directives.dirPagination","ngCookies"]);

app.config(['$routeProvider',function($routeProvider) {
  $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/bill", {
        templateUrl : "Bill-Order.html"
    })
    
    .otherwise({ redirectTo: '/' });
  }]);

app.controller("dataController",function($scope,$rootScope,$routeParams,$http,$cookies,$cookieStore,$location){
  $rootScope.pageSize = 9;
  $rootScope.currentPage = 1;
  $scope.filters = { };
  $scope.model = {};

  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order


    $http.get('/all_product').
    then(function(result, status, headers, config) {
      $rootScope.products = result.data.data;
          // console.log(result);
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
        // console.log(result);
      });

    $http.get('/chi_tiet_product').
    then(function(result, status, headers, config) {
      $rootScope.ones = result.data.data;
      // console.log(result);
    });
    $http.get('/hot_product').
    then(function(result, status, headers, config) {
      $rootScope.hots = result.data.data;
      // console.log(result);
    });
    $http.get('/random_product').
    then(function(result, status, headers, config) {
      $rootScope.randoms = result.data.data;
      // console.log(result);
    });
    $http.get('/random_4_product').
    then(function(result, status, headers, config) {
      $rootScope.rd = result.data.data;
      // console.log(result);
    });
    
    $http.get('/comment').
    then(function(result, status, headers, config) {
      $rootScope.comments = result.data.data;
      // console.log(result);
    });

    
    // ADD TO CART
    $scope.cart = [];
    $scope.total = 0;
    
    //Tao cookies cho sp va bien total
    if(!angular.isUndefined($cookies.get('total'))){
      $scope.total = parseFloat($cookies.get('total'));
    }
    //
    if (!angular.isUndefined($cookies.get('cart'))) {
      $scope.cart =  $cookies.getObject('cart');
    }
    // Them sp vao shop
    $scope.addItemToCart = function(product){  
      if ($scope.cart.length === 0){
        product.count = 1;
        $scope.cart.push(product);
      } else {
        var repeat = false;
        for(var i = 0; i< $scope.cart.length; i++){
          if($scope.cart[i].id === product.id){
            repeat = true;
            $scope.cart[i].count +=1;
          }
        }
        if (!repeat) {
          product.count = 1;
          $scope.cart.push(product);  
        }
      }
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.putObject('cart', $scope.cart,  {'expires': expireDate});
      $scope.cart = $cookies.getObject('cart');

      $scope.total += parseFloat(product.price);
      $cookies.put('total', $scope.total,  {'expires': expireDate});
    };

     //Tao cookies luu so luong sp trc khi add to cart(Trang Detail)
     $scope.slsp = 1;
     if(!angular.isUndefined($cookies.get('slsp'))){
      $scope.slsp = parseFloat($cookies.get('slsp'));
    }
    
    $scope.qty_incr = function(item){
      item.count = item.count + 1;
      $scope.slsp = item.count;
      expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.put('slsp', $scope.slsp,  {'expires': expireDate});  
    }
    $scope.qty_decr = function(item){
      if(item.count > 1){
        item.count = item.count - 1;
        $scope.slsp = item.count;
        expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.put('slsp', $scope.slsp,  {'expires': expireDate});  
      }

    }
    // Them sp da set quantity vao shop (Trang Detail)
    $scope.addItemquantity = function(product){ 
      var check = false; 
      //Kiem tra da add to cart chua? trc khi vao trang detail
      for(var i = 0; i< $scope.cart.length; i++){
        if($scope.cart[i].id === product.id){
          check = true;
          $scope.cart[i].count += $scope.slsp;
          expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
          $scope.cart = $cookies.getObject('cart');
          $scope.total += parseFloat(product.price*product.count);
          $cookies.put('total', $scope.total,  {'expires': expireDate});
        }
      }
      console.log(check);
      //Truong hop chua add to cart trc khi vao trang detail
      if(check == false){
        product.count =1;

        product.count = $scope.slsp;

        $scope.cart.push(product);

        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1); 
        $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
        $scope.cart = $cookies.getObject('cart');
        $scope.total += parseFloat(product.price*product.count);
        $cookies.put('total', $scope.total,  {'expires': expireDate});

      }
      $scope.slsp = 1;
      $cookies.put('slsp', $scope.slsp,  {'expires': expireDate}); 
    };

     // XOA HAN SP
     $scope.removeItemCart = function(product){
      var index = $scope.cart.indexOf(product);
      $scope.cart.splice(index, 1);
      expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
      $scope.cart = $cookies.getObject('cart');

      $scope.total -= parseFloat(product.price*product.count);
      $cookies.put('total', $scope.total,  {'expires': expireDate});

    };
     // Xoa tung sp mot
     $scope.removeONE = function(product){

       if(product.count > 1){
         product.count -= 1;
         var expireDate = new Date();
         expireDate.setDate(expireDate.getDate() + 1);
         $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
         $scope.cart = $cookies.getObject('cart');
         $scope.total -= parseFloat(product.price);
         $cookies.put('total', $scope.total,  {'expires': expireDate});
       }   
     };
     // Luu ten loai sp cho trag chi tiet(de lay cac sp cung loai)
     $scope.loaisp = "";
     if(!angular.isUndefined($cookies.get('loaisp'))){
      $scope.loaisp = $cookies.get('loaisp');
    }
    $scope.spChitiet = function(product){
      $scope.loaisp = product.type;
      expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.put('loaisp', $scope.loaisp,  {'expires': expireDate});      
    };
    //Chon phuong thuc thanh toan
    $scope.pay = "Direct bank transfer";
    if(!angular.isUndefined($cookies.get('pay'))){
      $scope.pay = $cookies.get('pay');
    }

    $scope.payment = function(){
      expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.put('pay', $scope.pay,  {'expires': expireDate}); 
    }
    // $scope.xemgiatri = function(){
    //   console.log(pay);
    // }


    $scope.delete_all_cookies = function(){
      var cookies = $cookies.getAll();
      angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
      });
    };



  });

