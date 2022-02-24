import BikeListComponent from "../../components/bike-list/bike-list.component";

const UserListComponent = () => {
  return <h3>UserList</h3>;
};

const ManagerListComponent = () => {
  return <h3>ManagerList</h3>;
};

export const constants = {
  BREADCRUMB_NAMES: [
    { label: "Users", component: UserListComponent },
    { label: "Managers", component: ManagerListComponent },
    { label: "Bikes", component: BikeListComponent },
  ],
  BUTTON_PROPS: {
    PRIMARY: "primary",
    DEFAULT: "default",
  },
};
