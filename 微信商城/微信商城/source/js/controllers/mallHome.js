angular.module("starter.mallHome",[])
.config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state("tabs",{
            url:"/tabs",
            abstract:true,
            templateUrl:"tabs.html",
            controller:"tabsController"
        })
        .state("tabs.mallHome",{
            url:"/mallHome",
            views:{
                "tabs-mallHome":{
                    templateUrl:"mallHome.html",
                    controller:"mallHomeCtrl"
                }
            }
        });
    $urlRouterProvider.otherwise("tabs/mallHome");
}])
    .controller("mallHomeCtrl",function ($scope,HttpFactory,$ionicSlideBoxDelegate,$rootScope,$ionicSideMenuDelegate,$state,$ionicNavBarDelegate,$ionicViewSwitcher,$http,$ionicModal) {
        // $ionicSlideBoxDelegate.update();
        $scope.homeObj = {
            //是否是积分商品
            integral:0,
            //侧边栏数据
            // cateData:{},
            //当前页数
            currentpage:1,
            // sideObj:{},
            //商品数据
            booksData:[],
            // //加载更多
            // moredata:false,
            // //是否有更多数据
            // noneOfMoreData:false,
            //已售罄
            // sellOut:sellOut,
            // //进入商品详情页面
            // goDetail:goDetail,
            //加入购物车
            // takeShopping:takeShopping,
            // //加载更多
            // loadMore:loadMore,
            //搜索
            goSearch:goSearch
        };

        var params = {
            //每页显示的数据数
            // total:perPageCount,
            //当前的页面
            page:$scope.homeObj.currentpage,
            integral:0,
            //默认显示6条数据
            bannum:6
            // is_recom:1
        };
        //ionic的生命周期，代码会在即将变为活动视图时执行
        $scope.$on('$ionicView.beforeEnter',function () {
            //隐藏tab标签
            $rootScope.hideTabs = false;
            $scope.searchValue = '';
        });
        //搜索功能
        function goSearch(searchStr) {
            $state.go('tabs.mallHome',{searchStr:searchStr});
            $rootScope.hideTabs=true;
            $scope.sideMenuObj.isSearch = true;
            //在使用$state.go()跳转页面时设置动画
            $ionicViewSwitcher.nextDirection('forward');
        }
        //轮播
        $scope.nextSlide=function () {
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.update();
        };
        //侧栏菜单按钮
        $scope.sideAction = function () {
            $ionicSideMenuDelegate.$getByHandle("mainSideMenu").toggleRight();
        };

        // 页面数据请求
        var url = "http://cms.mapi.dangdang.com/index.php?action=list_cms_info&user_client=iphone&client_version=6.8.0&union_id=537-50&permanent_id=20170506111240247322071821194616069&udid=42A4A3703AC585EC2C21829A03894BAC&time_code=254AC302DD548B74F23BCF8AEF892A81&timestamp=1494417930&pageid=131706&page_no=1&img_size=h HTTP/1.1";
        // url = encodeURI(url);  //中文转码
        // url = encodeURIComponent(url);
        // url = "http://www.bestjarvan.top?myUrl=" + url;
        // $http({
        //   url:url,
        //   method:"get"
        // })
        //   .then(function (res) {
        //     console.log("成功",res.data);
        //       $scope.homeObj.booksData = res.data.ret[35].content.value;
        //       console.log($scope.homeObj.booksData);
        //
        //
        //   } , function (err) {
        //     console.log("错误",err)
        //   });

        HttpFactory.getData(url , "get")
            .then(function (res) {
                console.log("成功",res.data);
                $scope.homeObj.booksData = res.data.ret[17].content.value;

                // $scope.homeObj.booksData = res.data.ret;
                $scope.homeObj.goDetail = function(item) {
                    console.log(item);
                    console.log($scope.homeObj.booksData[item].link_url);
                    var str = $scope.homeObj.booksData[item].link_url;
                    str = str.substring(14);
                    // console.log(1);
                    $state.go('tabs.booksDetail',{is_integral: "0", pid:str});
                    $ionicViewSwitcher.nextDirection('forward');
                }
            } , function (err) {
                console.log("错误",err);
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

        //进入商品详情


    });