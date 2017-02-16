(function(){

    var app = angular.module('appService', []);

    app.factory('offers', ['$http', function($http){

        var getAmountOfOffers = function (callback) {
            $http.get('getAmountOfOffers')   
                .then(function (data) {
                    callback(data.data);
                });
        };

        var getRecordsToDisplay = function (limit, success, error) {
            //jebany error nie dziala
            success = success||function(){};
            error = error||function(){};

            $http.get('getRecordsToDisplay', {params: {numberOfRecord: limit}})   
                .then(function (data) {
                    success(data.data);
                }, function(error) {
                    error(error)
                })
        };

        return {
            getAmountOfOffers: getAmountOfOffers,
            recordsToDisplay: getRecordsToDisplay
        };
    }]);
})();


