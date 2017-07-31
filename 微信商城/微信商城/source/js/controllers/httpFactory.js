// /自定义服务 加载数据
angular.module("starter.httpFactory" , [])
 .factory("HttpFactory" ,["$http" , "$q"  , function ($http , $q) {
   return {
     getData : function (url , type) {
       if(url){
         //  创建一个延迟对象实例
         var promise = $q.defer();
         //中文转码
         url = encodeURI(url);
         url = encodeURIComponent(url);
         url = "http://www.bestjarvan.top?myUrl=" + url;
         type = type ? type : "GET";
         return $http({
           url : url ,
           method : type
         });
       }

     }


   }

 }]);