angular.module("starter.integralStore",[])
    .config(["$stateProvider",function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state("tabs.integralStore",{
            url:"/integralStore",
            views:{
                "tabs-integralStore":{
                    templateUrl:"integralStore.html",
                    controller:"integralController"
                }
            }
        })
    }])
    .controller("integralController",function ($scope,HttpFactory,$http) {

        $scope.integralObj = {
            //是否是积分商品
            integral:0,
            //商品数据
            booksData:[]
        };

        var url = "http://cms.mapi.dangdang.com/index.php?action=list_cms_info&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=254AC302DD548B74F23BCF8AEF892A81&timestamp=1494417930&pageid=131706&page_no=1&img_size=h HTTP/1.1";

        HttpFactory.getData(url , "get")
            .then(function (res) {
                console.log("成功",res.data);
                $scope.integralObj.booksData = res.data.ret[13].content.value;
                console.log($scope.integralObj.booksData);
            } , function (err) {
                console.log("错误",err)
            });

        //下拉刷新
        $scope.doRefresh = function() {
            $http.get('/new-items')
                .success(function(newItems) {
                    $scope.items = newItems;
                })
                .finally(function() {
                    // 停止-广播ion-refresher
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    });