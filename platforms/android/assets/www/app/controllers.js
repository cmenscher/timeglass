'use strict';

var controllers = {};

controllers.AccelController = ["$rootScope", "$scope", "DeviceService", function ($rootScope, $scope, DeviceService) {
	var init = function () {
    	console.log("Initializing Accelerometer Controller...");
        DeviceService.watchAcceleration();
	}

	init();
}];

controllers.CompassController = ["$rootScope", "$scope", "DeviceService", function ($rootScope, $scope, DeviceService) {
    var init = function () {
        console.log("Initializing Compass Controller...");
        DeviceService.watchHeading({frequency:50});
    }

    init();
}];

controllers.PanoramController = ["$rootScope", "$scope", "DeviceService", function ($rootScope, $scope, DeviceService) {
	var init = function () {
		console.log("Initializing Panoram Controller...");
        DeviceService.watchHeading({frequency:50});
	}

	init();
}];

glassApp.controller(controllers, []);