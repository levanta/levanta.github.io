class TasksListController  {

  /**
   * Constructor
   *
   * @param $timeout
   * @param $http
   */
  constructor($http, $scope, $mdSidenav, $mdUtil, $log) {
    this.items = [];
    this.bool = true; 
    this.myValue = false;

    this.dateArray = [];
    var $this = this;
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
    $scope.$on('childEvent', function(event, data){
      $this.myValue = true;
      $this.dateArray = [];
      $this.items = [];
      $this.getTasksList($http)
    })
    angular.element(document.getElementById('content')).bind("scroll", function() {
        var elem = document.getElementById('content'),
            elemHeight = elem.offsetHeight,
            contentHeight = elem.scrollHeight,
            yOffset = elem.scrollTop; 

        if(yOffset + elemHeight >= contentHeight-20){
            $this.getTasksList($http, $this.selected)
        }

    });
  }

  /**
   * Show the bottom sheet
   */
  getTasksList($http) {
    // var project_id = this.selected ? this.selected.id : '';
    var project_id = this.selected ? 2 : '';
    var url = '/src/users/components/tasks/items.json?project_id='
    if (this.bool) {
        this.bool = false;
        $http.get(url).then(angular.bind(this, function (obj) {
            var lastDate = "";
            for(var i in obj.data){
                var dateValue = obj.data[i].date.split(" ")[0].replace(/-/g,'/');
                dateValue = Date.parse(dateValue);

                var ok = false;
                for(var j in this.dateArray) {
                    if(this.dateArray[j].time == dateValue) {
                        ok = true;
                        this.dateArray[j].data.push(obj.data[i]);
                    }
                }
                if(!ok) {
                    var o = {};
                    o.time = dateValue;
                    o.data = [obj.data[i]];
                    this.dateArray.push(o);
                }
            }
            this.items = this.items.concat(this.dateArray);
            this.bool = true
            this.project_id = 2
        }));
    }
  }

}
export default TasksListController;