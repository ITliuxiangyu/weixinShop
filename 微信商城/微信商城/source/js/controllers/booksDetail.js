angular.module('starter.booksDetail',[])
    // .config(["$stateProvider",function ($stateProvider) {
    //     $stateProvider
    //         .state("tabs.booksDetail",{
    //             url:"/booksDetail",
    //             params:{
    //                 pid:"" ,
    //                 is_integral:""
    //             },
    //             views:{
    //                 "tabs-mallHome":{
    //                     templateUrl:"booksDetail.html",
    //                     controller:"booksDetailController"
    //                 }
    //             }
    //         });
    // }])
    .controller('booksDetailController',function ($scope , $stateParams,HttpFactory,$rootScope) {
        $scope.booksObj = {
            //是否是积分商品 0 普通商品，1 积分商品
            is_integral: 0,
            //商品id
            // goods_id: $stateParams.goods_id,
            //是否售罄
            // isSellOut:false,
            collectName: "收藏",
            //是否收藏
            isCollect: false,
            //详情是否激活
            isInfoActive: true,
            //参数是否激活
            isParamActive: false,
            //评论是否激活
            isAssessActive: false,
            //视图切换
            // selection: 'goodsInfo',
            //商品数据
            booksData: {},
            //轮播视图数据
            // slideData: {
            //     bannerData: [],
            //     ishome: 2 //这里用于区分首页和积分首页的0 和 1，用于标示不能被点击
            // },
            //收藏
            // collectOption: collectionOption,
            //商品数量
            // changeGoodsNums: changeGoodsNums,
            //选中 商品详情
            // selectInfo: selectInfo,
            //选中 商品参数
            // selectParam: selectParam,
            // 选中 商品评价
            // selectAssess: selectAssess,
            // 选中 购物车
            // goShoppingCar: goShoppingCar,
            // 选中 加入购物车
            // putinShoppingCar: putinShoppingCar,
            // 选中 立即购买
            // buyNow: buyNowOption,
            //返回 首页
            backHome: backHome

        };

        //隐藏tab标签
        $scope.$on('$ionicView.beforeEnter',function () {
            $rootScope.hideTabs = true;
        });
        var pid  = $stateParams.pid;
        console.log(pid);
       var url = "http://product.mapi.dangdang.com/index.php?action=get_product&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=6E87B60F141BC40346D6B0454FC74E8F&timestamp=1495102588&pid=" + pid +"&expand=1,2,3,4,5,6&is_abtest=1&img_size=h&lunbo_img_size=h";
        HttpFactory.getData(url , "get")
            .then(function (res) {
                // console.log("成功",JSON.stringify(res.data));
                console.log("成功",res.data);
                $scope.booksObj.booksData = res.data;
                // console.log($scope.homeObj.booksData);
            } , function (err) {
                console.log("错误",err)
            });
       //返回首页
       function backHome() {
            $state.go('tabs.homePage');
        }

        // $scope.nextSlide=function () {
        //     $ionicSlideBoxDelegate.next();
        //     $ionicSlideBoxDelegate.update();
        // };

    });

