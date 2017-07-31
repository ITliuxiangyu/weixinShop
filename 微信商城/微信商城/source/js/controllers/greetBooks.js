angular.module('starter.graduateTest',[])
    .config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("tabs.greetBooks",{
                url:"/greetBooks",
                views:{
                    "tabs-mallHome":{
                        templateUrl:"greetBooks.html",
                        controller:"greetBooksController"
                    }
                }
            });
    }])
    .controller("greetBooksController",function ($scope,$state,HttpFactory) {

        $scope.graduateObj = {
            //是否是积分商品
            integral:0,
            //商品数据
            booksData:[]
        };
        //页面数据请求
        var url ="http://mapi.dangdang.com/index.php?action=bang_tushu&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=998FE5B6A7C30C3038CF7A4E96D20683&timestamp=1494042506&img_size=b&page=2&pagesize=10&time_region=24hours&cat_path=01.00.00.00.00.00&bang_name_text=%E6%96%B0%E4%B9%A6%E7%83%AD%E5%8D%96%E6%A6%9C&cat_path_text=%E6%80%BB%E6%A6%9C&time_region_text=%E8%BF%9124%E5%B0%8F%E6%97%B6&ischildren=0&bang_name=newhotsell";
        HttpFactory.getData(url,"get")
            .then(function (res) {
                console.log("成功",res.data.products);
                $scope.graduateObj.booksData = res.data.products;
                console.log($scope.graduateObj.booksData);
            } , function (err) {
                console.log("错误",err)
            });
    });