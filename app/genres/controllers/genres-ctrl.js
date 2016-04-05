app.controller('GenresCtrl', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	$scope.hamMenuOpened = false;

	Restangular.setBaseUrl('https://api.themoviedb.org/3/genre/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('list');
	query.customGET("", params).then(function (response){
		$scope.genres = response.genres;
	});
	$scope.genre = 'Select';

	$scope.changeGenre = function () {
		console.log('Genre change');
		$location.path('/genre/' + $scope.genre);
	};

	$scope.openHamMenu = function () {
		$scope.hamMenuOpened = !$scope.hamMenuOpened;
	};

}])
