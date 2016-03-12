app.controller('PopularCtrl' ,['$scope', '$rootScope', 'Restangular', '$firebaseArray', function($scope, $rootScope, Restangular, $firebaseArray) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('popular');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = 'Popular';
	
}]);