angular.module('starter.tabs',[])
    .controller('tabsController',function ($scope,$ionicLoading,$state) {
        var sideMenuObj = $scope.sideMenuObj = {
            //是否是积分商品 0 普通商品 1 积分商品
            is_integral:0,
            //标示全局搜索
            isSearch:false
        };
        $scope.loadingShow = function () {
            str = "加载中...请稍后"
        };
        //全局提示的弹窗
        $scope.popTipShow = function (msg) {
            $ionicLoading.show({
                template: msg,
                duration: 1000,
                noBackdrop: true
            }).then(function(){
                console.log("打开提示弹窗");
            });
        };

        //提示隐藏
        $scope.loadingOrPopTipsHide = function(){
            $ionicLoading.hide();
        };
        
        $scope.goGraduateTest = function () {
            console.log(1);
            $state.go('tabs.graduateTest');
        };

        $scope.goGreet = function () {
            $state.go('tabs.greetBooks');
        };

        $scope.goTextBook = function () {
            $state.go('tabs.textBooks')
        };
    });
