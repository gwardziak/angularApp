(function(){

    var app = angular.module('appService', []);

    app.factory('offers', ['$http', function($http){

        var getAmountOfOffers = function (callback) {
            $http.get('getAmountOfOffers')   
                .then(function (data) {
                    return callback(null, data.data);
                })
                .catch(function(err) {
                    return callback(err);
                });
        };

        var getRecordsToDisplay = function (limit, callback) {
            $http.get('getRecordsToDisplay', {params: {numberOfRecord: limit}})   
                .then(function (data) {
                    return callback(null, data.data);
                }, function(err) {
                    return callback(err);
                });
        };

        return {
            getAmountOfOffers: getAmountOfOffers,
            recordsToDisplay: getRecordsToDisplay
        };
    }]);
})();


