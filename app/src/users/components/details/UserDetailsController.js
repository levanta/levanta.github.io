class UserDetailsController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($timeout, $mdSidenav, $mdUtil, $log) {
    this.toggleRight = buildToggler('right');
    this.toggleNewtask = buildToggler('newtask');
    this.toggleAddTask = buildToggler('addtask');
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
  }

}
export default UserDetailsController;

