app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/popular/templates/movies.html',
    controller: 'PopularCtrl'
  })
  .when('/upcoming', {
    templateUrl: 'app/popular/templates/movies.html',
    controller: 'UpcomingCtrl'
  })
  .when('/toprated', {
    templateUrl: 'app/popular/templates/movies.html',
    controller: 'TopRatedCtrl'
  })
  .when('/nowplaying', {
    templateUrl: 'app/popular/templates/movies.html',
    controller: 'NowPlayingCtrl'
  })
  .when('/genre/:genreId', {
    templateUrl: 'app/popular/templates/movies.html',
    controller: 'GenreCtrl'
  })
  .when('/movie/:movieId', {
    templateUrl: 'app/movie/templates/movie.html',
    controller: 'MovieCtrl'
  })
  .when('/actor/:actorId', {
    templateUrl: 'app/actor/templates/actor.html',
    controller: 'ActorCtrl'
  })
  .otherwise({redirectTo: '/'});
}]);