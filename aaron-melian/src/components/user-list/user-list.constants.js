export const constants = {
  TABS: {
    USERS: "Users",
    MANAGERS: "Managers",
  },
  COLUMNS: [
    {
      title: "Bike",
      dataIndex: "bike",
      key: "bike",
    },
    {
      title: "Date Start",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Date End",
      dataIndex: "end",
      key: "end",
    },
  ],
  MODAL_TITLES: {
    FULL_RESERVATIONS: "Full Reservations:",
    EDIT_USER: "Edit User:",
  },
  EDIT_BUTTON_PROPS: {
    text: "Edit",
  },
  DELETE_BUTTON_PROPS: {
    text: "Delete",
  },
  BIKE_ICON_DEFAULT_VALUES: {
    model: "allRaound",
    color: "#000000",
  },
  POPCONFIRM_PROPS: {
    placement: "topRight",
    title: "Are you sure to delete this user?",
    okText: "Yes",
    cancelText: "No",
  },
  FULL_INFO_BUTTON_TEXT: "All Rents",
  EMPY_TABLE_TEXT: "No Reservations",
  COPY_TO_CLIPBOARD_BIKE_MESSAGE: "Bike ID copied to clipboard!",
  COPY_TO_CLIPBOARD_USER_MESSAGE: "User ID copied to clipboard!",
  NO_MATCHING_RESULTS_TEXT: "No matching results . . .",
  SEARCH_USERNAME_TEXT: "Search by username",
  SEARCH_ID_TEXT: "Search by id",
};
