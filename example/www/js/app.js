angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])


.config(function($stateProvider, $urlRouterProvider) {

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, swooshCardDelegate, $timeout) {

  var cardTypes = [
    { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/267/19067097362_72e9cee792_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
    { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/297/19072713565_1b72e2e824_n.jpg' }
  ];

  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    discards: [],
    liked: [],
    disliked: []
  }

  $scope.cardDestroyed = function(index) {
    var card = $scope.cards.active.splice(index, 1);
    // $scope.addCard(card);
  };

  $scope.addCard = function(card) {
    $scope.cards.active.push(angular.extend({}, card));
  }

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  }

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
  };

    $scope.sayHello = function() {
    console.log('Hello');
  };

})

.controller('CardCtrl', function($scope, swooshCardDelegate) {

});
