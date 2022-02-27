// React
import React, { useEffect, useState } from "react";

// Firebase
import firebase from "../../fbConfig";

// Redux
import { getBikes } from "../../store/actions/bikeActions";
import { getUsers } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// Components

import Icon from "../icon/icon.component";
import SearchByTwo from "../search-by-two/search-by-two.component";
import UserHistoryModal from "../user-history-modal/user-history-modal.component";
import UserModal from "../../components/user-modal/user-modal.component";
import UserPic from "../user-pic/user-pic.component";

// Utils
import { momentConfig } from "../../utils/mainUtils";

// Constants
import { constants } from "./user-list.constants";

// AntD
import { Button, Card, Table, message, Popconfirm } from "antd";

// Styles
import {
  ButtonWrapperStyled,
  IconWrapperStyled,
  NoMatchingResultsTextStyled,
  userPickStyled,
  UserPicWrapperStyled,
  UserListWrapperStyled,
  UserInfoWrapperStyled,
  UsernameTextStyled,
  UserWrapperStyled,
} from "./user-list.component.styled";

const UserList = ({ currentList }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const bikeList = useSelector((state) => state.bikes.bikeList);

  const [filteredUserList, setFilteredUserList] = useState([]);
  const [userReservationData, setUserReservationData] = useState([]);

  const [searchFilterId, setSearchFilterId] = useState("");
  const [searchFilterUsername, setSearchFilterUsername] = useState("");

  const [showUserHistoryModal, setShowUserHistoryModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const onSearchUsernameHandler = (e) => {
    setSearchFilterUsername(e.target.value);
  };
  const onSearchIdHandler = (e) => {
    setSearchFilterId(e.target.value);
  };

  const handleCopyToClipboardBike = (id) => {
    navigator.clipboard.writeText(id);
    message.success(constants.COPY_TO_CLIPBOARD_BIKE_MESSAGE);
  };
  const handleCopyToClipboardUserId = (id) => {
    navigator.clipboard.writeText(id);
    message.success(constants.COPY_TO_CLIPBOARD_USER_MESSAGE);
  };

  const handleFullInfo = (data) => {
    setUserReservationData(data);
    setShowUserHistoryModal(true);
  };

  const cancelUserModals = () => {
    setUserReservationData([]);
    setShowUserHistoryModal(false);
    setShowUserModal(false);
    setUserData({});
  };

  const handleShowUserModal = (user) => {
    setShowUserModal(true);
    setUserData(user);
  };

  const deleteUser = (userId) => {};

  useEffect(() => {
    if (!userList.length) {
      dispatch(getUsers());
    }
  }, [dispatch, userList]);

  useEffect(() => {
    if (!bikeList || !bikeList.length) {
      dispatch(getBikes());
    }
  }, [dispatch, bikeList]);

  useEffect(() => {
    let newList = [...userList];
    let filterManagers = currentList === constants.TABS.MANAGERS;

    newList = newList.filter((user) => {
      const isManagerFilter = !!user.isManager === filterManagers;
      const containsIdFilter = user.uid.includes(searchFilterId);
      const containsUsernameFilter = user.username
        .toLowerCase()
        .includes(searchFilterUsername.toLowerCase());

      return isManagerFilter && containsIdFilter && containsUsernameFilter;
    });
    setFilteredUserList(newList);
  }, [userList, currentList, searchFilterId, searchFilterUsername]);

  useEffect(() => {
    setSearchFilterId("");
    setSearchFilterUsername("");
  }, [currentList]);

  return (
    <>
      <SearchByTwo
        firstOnChange={onSearchUsernameHandler}
        firstPlaceholder={constants.SEARCH_USERNAME_TEXT}
        firstValue={searchFilterUsername}
        secondOnChange={onSearchIdHandler}
        secondPlaceholder={constants.SEARCH_ID_TEXT}
        secondValue={searchFilterId}
      />
      {showUserHistoryModal && (
        <UserHistoryModal
          cancelUserHistoryModal={cancelUserModals}
          show={showUserHistoryModal}
          title={constants.MODAL_TITLES.FULL_RESERVATIONS}
          data={userReservationData}
          columns={constants.COLUMNS}
        />
      )}
      {showUserModal && (
        <UserModal
          show={showUserModal}
          cancelUserModal={cancelUserModals}
          title={constants.MODAL_TITLES.EDIT_USER}
          userData={userData}
          editing={true}
        />
      )}
      <UserListWrapperStyled>
        {filteredUserList && filteredUserList.length > 0 ? (
          filteredUserList.map((user) => {
            let data =
              user.rentList &&
              user.rentList
                .map((rent, i) => {
                  const bikeData = bikeList.find(
                    (bike) => bike.id === rent.bike
                  );
                  if (!bikeData) {
                    return;
                  }
                  return {
                    key: `${user.uid}-${i}`,
                    start: rent.rentStart,
                    end: rent.rentEnd,
                    bike: (
                      <IconWrapperStyled
                        onClick={() => handleCopyToClipboardBike(rent.bike)}
                      >
                        <Icon
                          icon={
                            bikeData.model ||
                            constants.BIKE_ICON_DEFAULT_VALUES.model
                          }
                          color={
                            bikeData.color ||
                            constants.BIKE_ICON_DEFAULT_VALUES.color
                          }
                        />
                      </IconWrapperStyled>
                    ),
                  };
                })
                .sort(
                  (entry1, entry2) =>
                    momentConfig(entry2.end) - momentConfig(entry1.end)
                );
            let cropData = data && data.slice(0, 4);
            return (
              <Card
                key={user.uid}
                title={
                  <UserWrapperStyled>
                    <UserPicWrapperStyled
                      style={{ ...userPickStyled }}
                      onClick={() => handleCopyToClipboardUserId(user.uid)}
                    >
                      <UserPic picUrl={user.imgUrl} />
                    </UserPicWrapperStyled>
                    {!user.isManager && (
                      <UserInfoWrapperStyled>
                        <Button onClick={() => handleFullInfo(data)}>
                          {constants.FULL_INFO_BUTTON_TEXT}
                        </Button>
                      </UserInfoWrapperStyled>
                    )}
                    <UsernameTextStyled>{user.username}</UsernameTextStyled>
                  </UserWrapperStyled>
                }
                bordered={true}
                style={{ width: 480, margin: 4 }}
              >
                {!user.isManager && (
                  <Table
                    locale={{ emptyText: constants.EMPY_TABLE_TEXT }}
                    columns={constants.COLUMNS}
                    dataSource={cropData}
                    pagination={false}
                  />
                )}
                {/* <ButtonWrapperStyled>
                  <Button
                    style={{ width: 80, margin: 4 }}
                    onClick={() => handleShowUserModal(user)}
                  >
                    {constants.EDIT_BUTTON_PROPS.text}
                  </Button>
                  <Popconfirm
                    {...constants.POPCONFIRM_PROPS}
                    onConfirm={() => deleteUser(user.uid)}
                  >
                    <Button style={{ width: 80, margin: 4 }}>
                      {constants.DELETE_BUTTON_PROPS.text}
                    </Button>
                  </Popconfirm>
                </ButtonWrapperStyled> */}
              </Card>
            );
          })
        ) : (
          <NoMatchingResultsTextStyled>
            {constants.NO_MATCHING_RESULTS_TEXT}
          </NoMatchingResultsTextStyled>
        )}
      </UserListWrapperStyled>
    </>
  );
};

export default UserList;
