angular.module("starter",["ionic","starter.mallHome","starter.addAddress","starter.httpFactory","starter.integralStore","starter.personal","starter.tabs","starter.myOrder","starter.payRecord","starter.shoppingCart","starter.collection","starter.totalScore","starter.graduateTest","starter.graduateTest","starter.booksDetail","ngCordova"])
    .config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
        // $stateProvider
        //     .state("tabs",{
        //         url:"/tabs",
        //         abstract:true,
        //         templateUrl:"/tabs.html",
        //         controller:"tabsController"
        //     })
        //     .state("tabs.mallHome",{
        //         url:"/mallHome",
        //         views:{
        //             "tabs-mallHome":{
        //                 templateUrl:"/mallHome.html",
        //                 controller:"mallHomeCtrl"
        //             }
        //         }
        //     })
        //     .state("tabs.personal",{
        //         url:"/personal",
        //         views:{
        //             'tabs-personal':{
        //                 templateUrl:"/personal.html",
        //                 controller:"personalCtrl"
        //             }
        //         }
        //     })
        //     .state("tabs.integralStore",{
        //         url:"/integralStore",
        //         views:{
        //             "tabs-integralStore":{
        //                 templateUrl:"/integralStore.html",
        //                 controller:"integralController"
        //             }
        //         }
        //     })
        //     .state("tabs.addAddress",{
        //         url:"/addAddress",
        //         views:{
        //             'tabs-personal':{
        //                 templateUrl:'/addAddress.html',
        //                 controller:'addAddressController'
        //             }
        //         }
        //     })
        //     .state('tabs.myOrder',{
        //         url:'/myOrder',
        //         views:{
        //             'tabs-personal':{
        //                 templateUrl:"/myOrder.html",
        //                 controller:"myOrderController"
        //             }
        //         }
        //     });
        $stateProvider
            .state("tabs.booksDetail",{
                url:"/booksDetail",
                params:{
                    pid:"" ,
                    is_integral:""
                },
                views:{
                    "tabs-mallHome":{
                        templateUrl:"booksDetail.html",
                        controller:"booksDetailController"
                    }
                }
            });

        $urlRouterProvider.otherwise("tabs/mallHome");
    }]);
