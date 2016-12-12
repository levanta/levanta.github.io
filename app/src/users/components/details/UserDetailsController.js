class UserDetailsController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($timeout, $mdSidenav, $mdUtil, $scope, $http, $cookies, $rootScope) {
    this.toggleNewProj = buildToggler('newProj');
    this.toggleNewTask = buildToggler('newTask');
    this.toggleEditProj = buildToggler('editProj');
    this.taskName = "";
    this.description = "";
    this.session =  $cookies.get('session');
    this.projectList = [];
    this.selected = [];
    this.projectName = "";
    this.readonly = true;
    this.projTitle = "";
    var self = this;
    this.createTask = function(){
      this.taskName && $rootScope.$broadcast('createTask', this.taskName, this.description);
      this.taskName = "";
      this.description = "";
    }

    this.createProject = function(){
      function saveProject() {
        var createProjUrl = 'https://api-test-task.decodeapps.io/projects/project';
        var title = self.projectName;
        var params = {
          'session' : self.session,
          'Project' : {"title":title}
        }
        $http.post(createProjUrl, params).then(angular.bind(this, function (d) {
          var num = Object.keys(self.projectList).length;
          self.projectList[num] = {
            id : d.data.Project.id, task_count : 0, title : title
          }
        }));
      }
      this.projectName && saveProject();
    }

    this.deleteProject = function(selected, projectList){
      var deleteProjUrl = 'https://api-test-task.decodeapps.io/projects/project';
      var title = self.projectName;
      var params = {
        'session' : self.session,
        'project_id' : selected.id
      }
      $http.delete(deleteProjUrl, {params: params}).then( function (d) {
        for(var i in projectList) {
          if(projectList[i] && projectList[i].id==selected.id){
            projectList[i] = null
          }
        }
        $rootScope.$broadcast('hideBtn');
      });
    }

    this.editProject = function(selected){
      self.readonly = false;
      var element = angular.element(document.getElementById('projName'))[0];
      element.focus();
    }

    this.updateProj = function(selected){
      var updateProjUrl = 'https://api-test-task.decodeapps.io/projects/project';
      var params = {
        'session' : self.session,
        'Project' : {"id":selected.id, "title":self.projTitle}
      }
      $http.post(updateProjUrl, params).then(angular.bind(this, function (d) {
        selected.title = self.projTitle;
      }));

      
    }
    this.proj = {}
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {});
          },300);

      return debounceFn;
    }

    $scope.$on('newProj', function(event, projectList){
      self.projectList = projectList;
      self.toggleNewProj();
    })
    $scope.$on('newTask', function(event, task){
      self.toggleNewTask()
    })
    $scope.$on('editProj', function(event, proj){
      self.selected = proj;
      self.toggleEditProj()
    })
  }

}
export default UserDetailsController;

