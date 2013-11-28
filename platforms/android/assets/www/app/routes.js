 //This configures the routes and associates each route with a view and a controller
glassApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'MainController',
                templateUrl: 'views/main.html'
            })
        .otherwise({ redirectTo: '/' });
});
