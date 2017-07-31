angular.module("starter.addAddress",[])
    .config(function ($stateProvider) {
        $stateProvider
        .state("tabs.addAddress",{
            url:"/addAddress",
            views:{
                'tabs-personal':{
                    templateUrl:'addAddress.html',
                    controller:'addAddressController'
                }
            }
        });
    })
    .controller('addAddressController',function ($scope,$state,$rootScope,$http,$ionicModal,$ionicPopup,$timeout) {
        $scope.$on("$ionicView.beforeEnter", function () {
            //隐藏tabs-bar
            $rootScope.hideTabs = true;
        });

        $scope.napaObj = {
            provinces:[]
        };
        $scope.napaStores = {
            text:''
        };

        //模态地址选择
        $scope.addressObj = {
            //收货地址列表数据
            addressListData: [],
            //编辑地址的地址对象
            addressModal: {
                vname: '',
                tel: '',
                province: '',
                city: '',
                address: '',
                code: ''
            },
            //地址列表为空
            emptyPromptStr: '',
            //省份列表数据
            province: [],
            //城市列表的数据
            cities: [],
            //选中的省份
            selectedProvince: '',
            //选中的城市
            selectedCity: '',
            //选中变化
            selectedChange: selectedChange,
            //数据是否为空
            dataIsNull: false,
            //添加地址
            addAddress: addAddress,
            //取消添加
            cancelAdd:cancelAdd,
            //保存地址
            saveAddress: saveAddress,
            //关闭模态视图
            closeModal:closeModal,
            //打开模态视图
            openModal: openModal,
            //改变默认收货地址
            // changeDefault:changeDefault,
            // //删除地址的模态窗口
            // showConfirm:showConfirm,
            // //选择地址使用
            // selectAddress_user:selectAddress_user,
            // //打开省份和失去的选择模态窗口
            selectAddressModalShow:selectAddressModalShow
        };

        $scope.addressOptionObj = {};
        var isEdit = false;


        //打开模态
        function openModal(option, list, event) {
            if (option == 'edit') {
                isEdit = true;
                event.stopPropagation();
                $scope.addressOptionObj = list;
                $scope.addressObj.selectedProvince = list.province;
                $scope.addressObj.selectedCity = list.province;
                angular.forEach($scope.addressObj.province, function (province) {

                    if (province.name == list.province) {
                        $scope.addressObj.city = province.sub;
                    }
                });
                $scope.addressObj.city = list.city;
                $scope.addressOptionObj.title = "编辑收货地址";
            } else {
                isEdit = false;
                $scope.addressObj.selectedProvince = '';
                $scope.addressObj.selectedCity = '';
                $scope.addressObj.city = [];
                $scope.addressOptionObj = {
                    vname: '',
                    tel: '',
                    province: '',
                    city: '',
                    address: '',
                    code: ''
                };
                $scope.addressOptionObj.title = "新增收货地址";
            }

            //引入外部的编辑地址模态
            $ionicModal.fromTemplateUrl('editAddressModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addressModal = modal;
            });
            $timeout(function () {
                $scope.addressModal.show();
            }, 1000);
            $ionicModal.fromTemplateUrl('choiceAddress.html',{
                scope:$scope,
                animation: 'fade-out',
                focusFirstInput:true,
                backdropClickToClose:true
            }).then(function(modal) {
                $scope.selectModal = modal;
            });


        }

        //关闭模态
        function cancelAdd() {
            $scope.addressModal.hide();
        }
        function closeModal() {
            $scope.addressModal.hide();
        }
        $scope.doSome = function () {
            console.log(111111);
        };
        //当销毁controller时会清除模态modal
        $scope.$on('$destroy', function() {
            // MainData.isFromPersonToReceiptAddress = false;
            $scope.addressModal.remove();
            $scope.selectModal.remove();
            $scope.loadingOrPopTipsHide();

        });

        var selectType = '省份';
        $scope.modal = {
            hide:function () {
                if (selectType == "省份"){
                    $scope.addressObj.selectedProvince = $scope.napaStores.text;
                    $scope.addressObj.selectedCity = '';
                }
                if (selectType == "城市"){
                    $scope.addressObj.selectedCity = $scope.napaStores.text;
                }
                $scope.selectModal.hide();
            }
        };

        //点击新增地址，打开模态窗口
        function addAddress() {
            $scope.openModal();
        }

        //读取本地城市列表
        $http.get('../../lib/city.json')
            .then(function (res) {
                console.log("成功", res);
                $scope.addressObj.province = res;
                $scope.addressObj.province.data.splice(0, 1);
                angular.forEach($scope.addressObj.province, function (province) {
                    //去掉数组中的第一个元素
                    if (province.hasOwnProperty('sub')) {
                        province.sub.splice(0, 1);
                    }
                })
            }, function (err) {
                console.log("失败", err);
            });

        
        //当选择的省份发生改变时
        function selectedChange(selectedProvince) {
            angular.forEach($scope.addressObj.province, function (province) {

                //删除数组中的第一个元素
                if (province.name == selectedProvince) {
                    $scope.addressObj.cities = province.sub;
                }
            })
        }

        //新增收货地址、保存
        function saveAddress(addressParams) {
            $scope.loadingShow();
            addressParams.province = $scope.addressObj.selectedProvince;
            addressParams.city = $scope.addressObj.selectedCity;
            if (addressParams.province == "请选择") {
                addressParams.province = "";
            }
            if (addressParams.city == "请选择") {
                addressParams.city = "";
            }
            if (addressParams.vname == "" || addressParams.tel == "" || addressParams.address == "") {
                $scope.popTipShow("请补全地址信息");
                return false;
            }
            //手机号码验证
            if (!(/^1[34578]\d{9}$/.test(addressParams.tel))) {
                $scope.popTipShow("手机号码有误，请重填");
                return false;
            }


            $scope.addressObj.closeModal();
            //关闭模态
            function closeModal() {
                $scope.addressModal.hide();
            }

        }

        //打开省份和城市的选择模态窗口
        function selectAddressModalShow(str) {
            selectType = str;
            if (str == "省份"){
                $scope.napaObj.provinces = $scope.addressObj.provinces;
            }
            if(selectType == "城市"){
                selectedChange($scope.addressObj.selectedProvince);
                $scope.napaObj.provinces = $scope.addressObj.cities;
            }
            $scope.selectModal.show();
        }
    });
