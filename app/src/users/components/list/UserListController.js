class UserListController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($mdSidenav, $mdUtil, $log, $rootScope) {
    this.toggleRight = buildToggler('right');
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);

      return debounceFn;
    }
    this.showTasks = function () {
      $rootScope.$broadcast('childEvent', {message: 'Hello from Ctrl 3'});
    };
  }
}
export default UserListController;

