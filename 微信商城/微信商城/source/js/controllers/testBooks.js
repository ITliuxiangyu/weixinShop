
angular.module('starter.graduateTest',[])
    .config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("tabs.textBooks",{
                url:"/testBooks",
                views:{
                    "tabs-mallHome":{
                        templateUrl:"testBooks.html",
                        controller:"testBooksController"
                    }
                }
            });
    }])
    .controller("testBooksController",function ($scope,$state,HttpFactory) {

        $scope.testBooksObj = {
            //是否是积分商品
            integral:0,
            //商品数据
            booksData:[]
        };
        //页面数据请求
        var url ="http://search.mapi.dangdang.com/index.php?action=list_category&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=A016539F7D53745387ADEFFE7C4B0A08&timestamp=1494042745&page=2&page_size=10&loadad=1&sort_type=default_0&cid=01.49.01.00.00.00&img_size=e";
        HttpFactory.getData(url,"get")
            .then(function (res) {
                console.log("成功",res.data.products);
                $scope.testBooksObj.booksData = res.data.products;
                console.log($scope.testBooksObj.booksData);
            } , function (err) {
                console.log("错误",err)
            });
    });
