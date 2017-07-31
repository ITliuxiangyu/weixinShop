angular.module("starter.totalScore",[])
    .config(["$stateProvider",function ($stateProvider) {
        $stateProvider.state('tabs.totalScore',{
            url:'/totalScore',
            views:{
                'tabs-personal':{
                    templateUrl:'totalScore.html',
                    controller:'totalScoreController'
                }
            }
        });
    }])
    .controller("totalScoreController",function ($scope,$rootScope,$state,HttpFactory) {
        $scope.goExchange=function(msg){
            $state.go('tabs.integralStore');
        };
        $scope.$on('$ionicView.beforeEnter', function () {
            $rootScope.hideTabs = true;
        });
        $scope.scoreObj = {
            scoreListDatas: []
        };

        // HttpFactory.getData("/api/uintegral",{sessid:SESSID},"GET")
        //     .then(function (result) {
        //         $scope.scoreObj.scoreListDatas = result['integralData'];
        //         console.log($scope.scoreObj.scoreListDatas);
        //     },function (err) {
        //
        //     });
    });
