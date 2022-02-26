import BikeListComponent from "../../components/bike-list/bike-list.component";
import UserListComponent from "../../components/user-list/user-list.component";

export const constants = {
  BREADCRUMB_NAMES: [
    { label: "Users", component: UserListComponent },
    { label: "Managers", component: UserListComponent },
    { label: "Bikes", component: BikeListComponent },
  ],
  BUTTON_PROPS: {
    PRIMARY: "primary",
    DEFAULT: "default",
  },
  POPOVER_PROPS: {
    placement: "topRight",
    trigger: "click",
  },
  POPOVER_BUTTON_PROPS: {
    shape: "circle",
  },
  BIKE_MODAL_TITLE: "Add a Bike!",
};
