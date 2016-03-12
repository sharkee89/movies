app.controller('GenreCtrl' ,['$scope', '$rootScope', '$routeParams', 'Restangular', function($scope, $rootScope, $routeParams, Restangular) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/genre/');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all($routeParams.genreId + '/movies');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = $routeParams.genreId;
}]);