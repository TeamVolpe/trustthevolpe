export default function($interval) {
  return {
    restrict: "A",
    link: ($scope, $elm, $attrs) => {

      let mouseDown = (evt) => {
        evt.preventDefault();
        $scope.longPressInterval = $interval( () => {
          console.log("longpress");
          $scope.$eval($attrs.onLongPress);
        }, 300);
      };

      let mouseUp = (evt) => {
        evt.preventDefault();
        $interval.cancel($scope.longPressInterval);
        if ($attrs.onTouchEnd) {
            $scope.$eval($attrs.onTouchEnd);
        }
      };

      $elm.bind("mousedown", mouseDown);
      $elm.bind("touchstart", mouseDown);

      $elm.bind("mouseup", mouseUp);
      $elm.bind("mouseleave", mouseUp);
      $elm.bind("touchend", mouseUp);
      $elm.bind("touchleave", mouseUp);
    }
  };
}
