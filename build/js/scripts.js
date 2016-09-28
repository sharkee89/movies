app.controller('ActorCtrl', ['$scope', '$routeParams', 'Restangular', '$location', function($scope, $routeParams, Restangular, $location){

    Restangular.setBaseUrl('https://api.themoviedb.org/3/person');
    var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
    var query = Restangular.all($routeParams.actorId);
    query.customGET("", params).then(function (response){
        $scope.actor = response;
        $scope.mainImage = 'http://image.tmdb.org/t/p/w500' + response.profile_path;

        //HTTP request for actor's images
        query = Restangular.all(response.id).all('images');
        query.customGET("", params).then(function (response){
            $scope.actor.images = response.profiles;
        });

        query = Restangular.all(response.id).all('movie_credits');
        query.customGET("", params).then(function (response){
            $scope.movieCredits = response.cast;
            $scope.mySlides = [];
            for (index in $scope.movieCredits) {
                var movie = {
                    id: $scope.movieCredits[index].id,
                    image: 'http://image.tmdb.org/t/p/w500' + $scope.movieCredits[index].poster_path
                };
                    $scope.mySlides.push(movie.image);
            }
        });
    });

    $scope.changePicture = function (path) {
        var imgPath = 'http://image.tmdb.org/t/p/w500' + path;
        $scope.mainImage = imgPath;
    };

    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function(movie) {

        //var newWidth = 600 + slides.length + 1;
        if (movie) {
            slides.push({
                image: movie.image,
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++,
                movieId: movie.id
            });
        }
    };

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }

}])

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

app.controller('MovieCtrl', ['$scope', '$routeParams', 'Restangular', '$location', function($scope, $routeParams, Restangular, $location){
	$scope.showCommentForm = false;

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

		$scope.comments.$add(comment);

		$scope.commentNick = '';
		$scope.commentText = '';
		$scope.showCommentForm = false;
	}



}])


app.controller('NowPlayingCtrl' ,['$scope', '$rootScope', 'Restangular', function($scope, $rootScope, Restangular) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('now_playing');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = 'Now Playing';
}]);
app.controller('PopularCtrl' ,['$scope', '$rootScope', 'Restangular', function($scope, $rootScope, Restangular) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('popular');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = 'Popular';
	
}]);
app.controller('TopRatedCtrl' ,['$scope', '$rootScope', 'Restangular', function($scope, $rootScope, Restangular) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('top_rated');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = 'Top rated';
}]);
app.controller('UpcomingCtrl' ,['$scope', '$rootScope', 'Restangular', function($scope, $rootScope, Restangular) {
	$rootScope.searchPhrase = '';
	Restangular.setBaseUrl('https://api.themoviedb.org/3/movie');
	var params = {api_key: "1fd95566952c08b6ecf132ae47c16a33"};
	var query = Restangular.all('upcoming');
	query.customGET("", params).then(function (response){
		$scope.popularMovies = response.results;
	});

	$rootScope.selectedId = 'Upcoming';
}]);