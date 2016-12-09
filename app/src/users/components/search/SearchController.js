class SearchController  {

  /**
   * Constructor
   *
   * @param $timeout
   * @param $http
   */
  constructor($http, $mdBottomSheet) {
    this.search = ''
    // this.items = [];
    // this.bool = true;
    // this.getSearch($http, this.selected);
  }

  // getSearch($http, proj) {
  //   var url = '/src/users/components/tasks/items.json?project_id='
  //   if (this.bool) {
  //       this.bool = false;
  //       $http.get(url).then(angular.bind(this, function (obj) {
  //           this.items = this.items.concat(obj.data);
  //           this.bool = true
  //       }));
  //   }
  // }

}
export default SearchController;