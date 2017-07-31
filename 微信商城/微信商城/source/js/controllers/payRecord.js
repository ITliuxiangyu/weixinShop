angular.module("starter.payRecord",[])
    .config(["$stateProvider",function ($stateProvider) {
        $stateProvider
            .state("tabs.payRecord",{
                url:"/payRecord",
                views:{
                    "tabs-personal":{
                        templateUrl:"payRecord.html",
                        controller:"payRecordController"
                    }
                }
            })
    }])
    .controller("payRecordController",function ($scope,$rootScope) {
        $scope.$on('$ionicView.beforeEnter',function () {
            $rootScope.hideTabs = true;
        })
    });