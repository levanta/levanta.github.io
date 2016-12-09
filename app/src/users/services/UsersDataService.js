/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function UsersDataService($q) {
  var data = {};
  data.users = [
    {
        "id": 1,
        "title": "Private",
        "task_count": 8
    },
    {
        "id": 2,
        "title": "Decode",
        "task_count": 25
    },
    {
        "id": 3,
        "title": "Family",
        "task_count": 3
    },
    {
        "id": 4,
        "title": "Cookle",
        "task_count": 13
    }
  ];
  data.tasks = [
    {
      "Task": {
        "id": 123,
        "title": "Some project",
        "created_at": "2016-31-12 12:59:59"
      }
    }
  ];
  data.account = {
      "username": "Trevor Reyes",
      "image_url": "./assets/images/photo.png"
  };

  // Promise-based API
  return {
    loadAllUsers: function() {
      return $q.when(data);
    }
  };
}
export default ['$q', UsersDataService];

