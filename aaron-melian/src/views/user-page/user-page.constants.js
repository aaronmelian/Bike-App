import BikeListComponent from "../../components/bike-list/bike-list.component";

export const constants = {
  BREADCRUMB_NAMES: [
    { label: "Bikes", component: BikeListComponent },
    { label: "Reservations", component: BikeListComponent },
  ],
  BUTTON_PROPS: {
    PRIMARY: "primary",
    DEFAULT: "default",
  },
};
