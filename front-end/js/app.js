(function(){

    var app = angular.module('app', ['ngRoute', 'appService',]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home/page/:pageId', {
                controller: 'offersCtrl',
                templateUrl: '/views/holidayofferts.html'
            })
            .otherwise({
                redirectTo: '/home/page/1'
            });

        $locationProvider
            .html5Mode(true);

    }]);


    app.controller('mainCtrl', ['$scope', function($scope){

    }]);

   
    app.controller('offersCtrl', ['$scope', 'offers', '$routeParams','$location', function($scope, offers, $routeParams, $location){

    	$scope.isActive = function(viewLocation) { 
        	return viewLocation === $location.path();
    	};

        offers.getAmountOfOffers(function(err, offers) {
            if (err) return console.error(err);

            $scope.amountOfNavBtns = amountOfNavBtns(offers);
        });

        function amountOfNavBtns(amountOfRecords) {
            var mod = 0;
            if(amountOfRecords % 4 != 0)
                mod = 1;
            amountOfRecords /= 4;
            amountOfRecords = (Math.floor(amountOfRecords) + mod);
            return amountOfRecords;
        }  

        $scope.getNumber = function(num) {
            return new Array(num);   
        }

        offers.recordsToDisplay(numberOfFirstRecord($routeParams.pageId), function(err, recordsToDisplay) {
            if (err) return console.error(err);
            
            $scope.recordsToDisplay = recordsToDisplay;
        });
       
        function numberOfFirstRecord(pageId) {
            var limit;
            if(pageId != 1)
                limit = pageId*4-4;
            else
                limit = 0;
            return limit;
        }


        $scope.actualPage  = parseInt($routeParams.pageId);

    }]);
})();

