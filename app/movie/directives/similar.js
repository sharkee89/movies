app.directive('bxSlider', function () {
        var BX_SLIDER_OPTIONS = {
            minSlides: 2,
            maxSlides: 7,
            slideWidth: 120
        };

        return {
            restrict: 'A',
            require: 'bxSlider',
            priority: 0,
            controller: function() {},
            link: function (scope, element, attrs, ctrl) {
                var slider;
                ctrl.update = function() {
                    slider && slider.destroySlider();
                    slider = element.bxSlider(BX_SLIDER_OPTIONS);
                };
            }
        }
    });
app.directive('bxSliderItem', function($timeout) {
        return {
            require: '^bxSlider',
            link: function(scope, elm, attr, bxSliderCtrl) {
                if (scope.$last) {
                    bxSliderCtrl.update();
                }
            }
        }
    });
app.directive('docListWrapper', ['$timeout', function ($timeout) {
        return {
            restrict: 'C',
            priority: 500,
            replace: false,
            templateUrl: 'tmpl-doc-list-wrapper',
            scope: { docs: '=docs'},
            link: function (scope, element, attrs) {
            }
        };
    }]);