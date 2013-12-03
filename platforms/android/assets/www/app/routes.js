 //This configures the routes and associates each route with a view and a controller
glassApp.config(function ($routeProvider) {
    $routeProvider
        .when("/",
            {
                controller: "PanoramController",
                templateUrl: "views/panoram.html"
            })
        .when("/compass",
            {
                controller: "CompassController",
                templateUrl: "views/compass.html"
            })
        .when("/accel",
            {
                controller: "AccelController",
                templateUrl: "views/accel.html"
            })
        .when("/panoram",
	        {
	        	controller: "PanoramController",
	        	templateUrl: "views/panoram.html"

	        })
        .otherwise({ redirectTo: "/" });
});
