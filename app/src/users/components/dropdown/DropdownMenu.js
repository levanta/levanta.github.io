// Notice that we do not have a controller since this component does not
// have any specialized logic.
import DropdownMenuController from './DropdownMenuController'

export default {
  name : 'dropdownMenu',
  config : {
    bindings         : {  users: '<', selected : '<'},
    templateUrl      : 'src/users/components/dropdown/dropdownMenu.html',
    controller       : [ '$mdDialog', '$rootScope', '$scope', DropdownMenuController ]
  }
};
