angular.module('starter.graduateTest',[])
    .config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("tabs.graduateTest",{
                url:"/graduateTest",
                views:{
                    "tabs-mallHome":{
                        templateUrl:"graduateTest.html",
                        controller:"graduateTestController"
                    }
                }
            });
    }])
    .controller("graduateTestController",function ($scope,$state,HttpFactory) {

        $scope.graduateObj = {
            //是否是积分商品
            integral:0,
            //商品数据
            booksData:[]
        };
        //页面数据请求
        var url ="http://search.mapi.dangdang.com/index.php?action=list_category&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=C83849E16F2E8765DC22BF1FFEB59F19&timestamp=1494041558&page=1&page_size=10&loadad=1&sort_type=default_0&cid=01.47.93.00.00.00&img_size=e";
        HttpFactory.getData(url,"get")
            .then(function (res) {
                console.log("成功",res.data.products);
                $scope.graduateObj.booksData = res.data.products;
                console.log($scope.graduateObj.booksData);
            } , function (err) {
                console.log("错误",err)
            });
    });
