var angular = require('angular');
require('angular-animate');

// more code here
angular.module('review', ['ngAnimate'])
	.controller('cardReview', function($scope, $http){
		$scope.currentCard = 0;

		$scope.questions = [];
		// get the question
		$http.get('questions.json').then(function(resp){
			$scope.questions = resp.data;
		});

		$scope.setCard = function(index){
			$scope.currentCard = index;
		}

	})
	.controller('cardReviewStack', function($scope, $http){
		$scope.currentCard = 0;

		$scope.questions = [];
		// get the question
		$http.get('questions.json').then(function(resp){
			$scope.questions = resp.data;
		});

		$scope.setCard = function(index){
			$scope.currentCard = index;
		}

		$scope.beforeClass = function(index){
			if ( $scope.currentCard < index ){
				return 'before-active-' + (index - $scope.currentCard);
			} else if($scope.currentCard > index) {
				return 'after-active-' + ($scope.currentCard - index);
			}
		}
	})
	.directive('starsRating', function(){
		var link = function(scope, element, attrs){
			var container = $(element).find('.stars-container');

			container.find('.star').on('mouseover',function(){
				container.removeClass('star-1 star-2 star-3 star-4 star-0');
				container.addClass('star-' + $(this).index());
			});

			container.on('mouseleave', function(){
				container.removeClass('star-1 star-2 star-3 star-4 star-0');
			})
		};
		return {
			restrict: 'E',
			link: link,
			template: '<div class="stars-container">'+
						'<span class="star icon-star-full"></span>'+
						'<span class="star icon-star-full"></span>'+
						'<span class="star icon-star-full"></span>'+
						'<span class="star icon-star-full"></span>'+
						'<span class="star icon-star-full"></span>'+
					'</div>'
		};
	});