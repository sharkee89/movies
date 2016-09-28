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
