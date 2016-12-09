// Load the custom app ES6 modules

import UsersDataService from 'src/users/services/UsersDataService';

import UsersList from 'src/users/components/list/UsersList';
import UserDetails from 'src/users/components/details/UserDetails';
import TasksList from 'src/users/components/tasks/TasksList';
import Search from 'src/users/components/search/Search';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])

  .component(UsersList.name, UsersList.config)
  .component(UserDetails.name, UserDetails.config)
  .component(TasksList.name, TasksList.config)
  .component(Search.name, Search.config)

  .service("UsersDataService", UsersDataService);
