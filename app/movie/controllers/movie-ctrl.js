app.controller('MovieCtrl', ['$scope', '$routeParams', 'Restangular', '$location', '$firebaseArray', function($scope, $routeParams, Restangular, $location, $firebaseArray){
	$scope.showCommentForm = false;
	var ref = new Firebase("https://shining-heat-1948.firebaseio.com/comments");
	$scope.comments = $firebaseArray(ref);

	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all($routeParams.movieId);
	query.customGET("", params).then(function (response){

		$scope.movie = response;
		$scope.movieFBFilter = $scope.movie.id;

		$scope.mainImage = 'http://image.tmdb.org/t/p/w500' + $scope.movie.poster_path;
		Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
		query = Restangular.all(response.id).all('videos');
		query.customGET("", params).then(function (response){
			$scope.videoId = response.results[0] ? response.results[0].key : {};
		});
		Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
		query = Restangular.all(response.id).all('images');
		query.customGET("", params).then(function (response){
			$scope.movie.images = response.posters;
		});

		Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
		query = Restangular.all(response.id).all('credits');
		query.customGET("", params).then(function (response){
			$scope.movie.actors = response.cast;
		});

		Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
		query = Restangular.all(response.id).all('similar');
		query.customGET("", params).then(function (response){
			$scope.similar = response.results;
			$scope.docs = [];
			for (index in $scope.similar) {
				var slideMovie = {
					"id" : $scope.similar[index].id,
					"doc" : "http://image.tmdb.org/t/p/w500" + $scope.similar[index].poster_path
				}
				$scope.docs.push(slideMovie);
			}
		});
	});

	// $scope.selectGenre = function () {
	// };

	$scope.changePicture = function (path) {
		var imgPath = 'http://image.tmdb.org/t/p/w500' + path;
		$scope.mainImage = imgPath;
	};

	$scope.toggleCommentsForm = function () {
		$scope.showCommentForm = !$scope.showCommentForm;
	}

	$scope.postComment = function (nick, text, movieId) {
		var comment = {
			nick: nick,
			text: text,
			timestamp: new Date().getTime(),
			movieId: movieId
		}

		$scope.comments = $firebaseArray(ref);
		$scope.comments.$add(comment);

		$scope.commentNick = '';
		$scope.commentText = '';
		$scope.showCommentForm = false;
	}



}])
