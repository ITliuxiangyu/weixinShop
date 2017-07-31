angular.module("starter.personal",[])
    .config(function ($stateProvider,$urlRouterProvider) {
       $stateProvider
           .state("tabs.personal",{
               url:"/personal",
               views:{
                   'tabs-personal':{
                       templateUrl:"personal.html",
                       controller:"personalCtrl"
                   }
               }
           });
        $urlRouterProvider.otherwise("tabs/mallHome");
    })
    .controller("personalCtrl",function ($scope,$state,$rootScope) {
        $scope.personal={
            //用户名
            username:localStorage.name,
            //用户头像
            headimgUrl:localStorage.headimgUrl,
            //用户积分
            creditNum:localStorage.creditNum ? localStorage.creditNum : 0,
            //进入订单
            showOrder:showOrder,
            //进入收藏
            showCollect:showCollect,
            //进入购物车
            showShoppingCar:showShoppingCar,
            //进入积分页面
            showCredit:showCredit,
            //进入收货地址页面
            showAddress:showAddress,
            //进入支付记录页面
            showPay:showPay
            // //打开分享提示模态
            // share:share
        };

        $scope.$on('$ionicView.beforeEnter',function () {
            //隐藏tab标签
            $rootScope.hideTabs = false;
        });
        //$state.go(to[,toParams][,options])
        /*
         参数：
         to:state路径
         toParams：发送给state的数据参数，由$stateParams构建
         options：{ location: true, inherit: true, relative: $state.$current, notify: true }
         */

        //进入订单页面
        function showOrder() {
            $state.go('tabs.myOrder');
            // $ionicViewSwitcher.nextDirection("forward");
        }

        //进入收藏页面
        function showCollect() {
            $state.go('tabs.collectionPager');
        }

        //进入积分页面
        function showCredit() {
            $state.go('tabs.totalScore');
        }

        //进入购物车页面
        function showShoppingCar() {
            $state.go('tabs.shoppingCart');
        }

        //进入收获地址
        function showAddress() {
            $state.go('tabs.addAddress');
        }

        //进入支付页面
        function showPay() {
            $state.go('tabs.payRecord');
        }
        
    });