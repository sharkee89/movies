app.controller('CommentsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	$scope.showCommentForm = false;
	var ref = new Firebase("https://shining-heat-1948.firebaseio.com/comments");
	$scope.comments = $firebaseArray(ref);
	$scope.movieFBFilter = $scope.movie.id;

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