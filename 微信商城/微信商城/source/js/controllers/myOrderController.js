/**
 * Created by lx on 2016/12/9.
 */
angular.module('starter.myOrder',['ionic'])
    .config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.myOrder',{
        url:'/myOrder',
        views: {
           'tabs-personal': {
               templateUrl:'myOrder.html',
               controller:'myOrderController'
           }
        }
        
    });

}]).controller('myOrderController',['$rootScope','$scope','$state','$ionicViewSwitcher','$ionicPopup','$ionicScrollDelegate','$timeout','HttpFactory',function ($rootScope,$scope,$state,$ionicViewSwitcher,$ionicPopup,$ionicScrollDelegate,$timeout,HttpFactory) {
    $scope.myOrder = {
        //用于过滤数据的关键字
        keyWords:'',
        //导航栏选项再点击选项按钮时触发的事件
        navData:navData,
        //全部订单信息
        orderDatas:[],
        //状态列表
        stateInfos: ["未付款","待发货","待收货","交易完成","退款中","已退款","交易关闭"],
        //存储订单商品信息
        allData:'',
        //取消订单的方法
        cancelBill:cancelBill,
        //付款的方法
        payment:payment,
        //退款的方法
        refund:refund,
        //确认订单的方法
        confirm:confirm,
        //评价的方法
        appraise:appraise,
        //跳转订单详情
        goOrderDetail: goOrderDetail,
        //图片根地址
        IconRootURL: '',
        //申请退款原因
        applyMsg: '',
        //为空的信息
        emptyMsg: '',
        //是否加载更多
        moredata: false,
        //没有更多数据时显示的文本
        noMoreDataMsg: '',
        //加载更多
        loadMore: loadMore,
        //刷新
        doRefresh: doRefresh

    };
    var currentPage = 1;
    var orderState = '';
    var params = {
        page:1,
        total:10,
        state:'0'
    };
    //隐藏 tabs
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = true;
    });
    //下拉刷新
    function doRefresh() {
        getOrders();
    }
    //下拉刷新获取订单数据
    function getOrders() {
        params.page = 1;
        console.log(params);
        HttpFactory.getData('/api/Order',params)
            .then(function (result) {
                if (result.status == 0) {
                    $scope.$broadcast('scroll.refreshComplete');
                    
                    $scope.loadingOrPopTipsHide();
                    
                    $scope.myOrder.orderDatas = result.orderData;
                    // $scope.myOrder.emptyMsg = $scope.myOrder.orderDatas.length == 0 ? "您的此类订单为空O(∩_∩)O~" : '';
                    // if (params.page == 1 && $scope.myOrder.orderDatas.length == 0) {
                    //     $scope.myOrder.noMoreDataMsg = ''
                    // }
                    $scope.myOrder.moredata = (result.orderData.length < 10);
                    params.page ++;
                }
            },function (err) {
                
            });
    }
    //上拉加载
    function loadMore() {
        console.log(params);
        HttpFactory.getData('/api/Order',params)
            .then(function (result) {
                console.log(result);
                // return;
                if (result.status == 0) {
                    $scope.loadingOrPopTipsHide();
                    $scope.myOrder.orderDatas = $scope.myOrder.orderDatas.concat(result.orderData);
                    // console.log($scope.myOrder.orderDatas);
                    // $scope.myOrder.noMoreDataMsg = result.orderData.length < perPageCount ? "没有更多订单..." : '';
                    $scope.myOrder.moredata = (result.orderData.length < 10);
                    // console.log($scope.myOrder.moredata);
                    // $scope.myOrder.emptyMsg = $scope.myOrder.orderDatas.length == 0 ? "您的此类订单为空O(∩_∩)O~" : '';
                    // if (params.page == 1 && $scope.myOrder.orderDatas.length == 0) {
                    //     $scope.myOrder.noMoreDataMsg = ''
                    // }
                    //放最后
                    params.page ++;
                }else {
                    $scope.myOrder.moredata = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },function (err) {
            });
    }
    //进入订单详情
    function goOrderDetail(orderData) {
        
        var orderObj = {
            orderData: orderData
        };
        //传参： 订单号
        $state.go('tabs.orderDetail',{oid: orderData.ordercode});
    }
    //点击导航栏菜单
    function navData(event) {
        //每次点击的时候 页面置顶
        $ionicScrollDelegate.$getByHandle('orderScroll').scrollTop();
        //每次点击的时候不让下拉走
        $scope.myOrder.moredata = true;

        var list = angular.element(event.currentTarget).children();
        var item = angular.element(event.target);
        
        //对数据进行过滤
        if (item.text() == '全 部'){
            params.page = 1;
            $scope.myOrder.orderDatas = [];
            $scope.myOrder.moredata = false;
            params.state = '0';
        }
        //改变元素的样式.
        if (event.currentTarget != event.target){
            list.removeClass('active');
            item.addClass('active');
            params.page = 1;
            $scope.myOrder.orderDatas = [];
            $scope.myOrder.moredata = false;
            // $scope.loadingShow();
            switch (item.text()){
                case '待付款':
                    params.state = '7';
                    // getOrders("0");
                    break;
                case '待发货':
                    params.state = '1';
                    // getOrders("1");
                    break;
                case '待收货':
                    params.state = '2';
                    // getOrders("2");
                    break;
                case '待评价':
                    params.state = '3';
                    // getOrders("3");
                    break;
                default:
                    break;
            }
        }
    }
    //取消订单
    function cancelBill(event,index) {
        event.stopPropagation();
        //弹出弹框
            $ionicPopup.show({
            cssClass:'myOrder',
            template:'确认要取消订单吗？',
            buttons:[{
                text:'取消',
                onTap:function () {

                }
            },{
                text:'确定',
                onTap:function () {
                    var params_index = {
                        // sseid: SESSID,
                        oid: $scope.myOrder.orderDatas[index].mastOrderId,
                        state: 6
                    };
                    HttpFactory.getData("/api/Order",params_index,"PATCH").then(function (result) {
                        console.log(result);
                        if(result.status == 0){
                            $scope.myOrder.orderDatas[index].state = "6";
                            $scope.popTipShow("取消成功!");
                        }else {
                            $scope.popTipShow(result.desc);
                        }

                    },function (err) {

                    });
                }
            }]

        });

    }
    //付款
    function payment(items,event) {
        event.stopPropagation();
        console.log("付款");
    }
    //申请退款
    function refund(event,index) {
        event.stopPropagation();
        $ionicPopup.show({
            cssClass:'myOrder refund',
            template:'<p>申请退款</p><textarea id="applyMsg" ng-model="myOrder.applyMsg" placeholder="请输入申请退款的原因？" maxlength="100"></textarea><div>{{myOrder.applyMsg.length || "0"}}/100</div>',
            scope: $scope,
            buttons:[{
                text:'取消',
                onTap:function (e) {
                    
                }
            },{
                text:'确定',
                onTap:function () {
                    var params = {
                        // sseid: SESSID,
                        oid: $scope.myOrder.orderDatas[index].mastOrderId,
                        state: 4,
                        mess: $scope.myOrder.applyMsg
                    };
                    HttpFactory.getData("/api/Order",params,"PATCH")
                        .then(function (result) {
                            console.log(result);
                            if(result.status == 0){
                                $scope.myOrder.orderDatas[index].state = "4";
                                $scope.popTipShow("申请成功!");
                            }else {
                                $scope.popTipShow(result.desc);
                            }
                        },function (error) {
                            
                        });
                }
            }]

        });
    }
    //确认收货
    function confirm(event,index) {
        event.stopPropagation();
        $ionicPopup.show({
            cssClass:'myOrder',
            template:'确认是否已收到货？',
            buttons:[{
                text:'取消',
                onTap:function () {

                }
            },{
                text:'确定',
                onTap:function () {
                    var params_index = {
                        // sseid: SESSID,
                        oid: $scope.myOrder.orderDatas[index].mastOrderId,
                        state: 3
                    };
                    HttpFactory.getData("/api/Order",params_index,"PATCH").then(function (result) {
                        console.log(result);
                        if(result.status == 0){
                            $scope.myOrder.orderDatas[index].state = "3";
                            $scope.popTipShow("交易完成!");
                        }else {
                            $scope.popTipShow(result.desc);
                        }

                    },function (err) {

                    });
                }
            }]

        });
        
    }
    //去评价
    function appraise(items,event) {
        event.stopPropagation();
        $state.go('tabs.evaluatePage');
    }
}]);




