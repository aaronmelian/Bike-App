// React
import React, { useEffect, useState } from "react";

// Firebase
import firebase from "../../fbConfig";
import { doc, deleteDoc } from "firebase/firestore";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Components
import BikeHistoryModal from "../bike-history-modal/bike-history-modal.component";
import BikeModal from "../bike-modal/bike-modal.component";
import SearchByTwo from "../search-by-two/search-by-two.component";
import CancelBikeModal from "../cancel-bike-modal/cancel-bike-modal.component";
import Icon from "../icon/icon.component";
import RentBikeModal from "../rent-bike-modal/rent-bike-modal.component";

// Utils
import {
  hasOngoingReservation,
  isBikeAvailableOnRange,
} from "../../utils/mainUtils";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";
import { constants } from "./bike-list.constants";

// AntD
import {
  Button,
  Card,
  DatePicker,
  Divider,
  message,
  Popconfirm,
  Rate,
} from "antd";

// Styles
import {
  BikeListWrapperStyled,
  BikeModelWrapperStyled,
  ButtonWrapperStyled,
  historyButtonStyled,
  iconPointerStyleIfManager,
  IconWrapperStyled,
  ModelTextTitleStyled,
  NoMatchingResultsTextStyled,
  RangePickerWrapperStyled,
  RatingTitleStyled,
  RatingWrapperStyled,
} from "./bike-list.component.styled";

const BikeList = ({ currentList }) => {
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [showRentBikeModal, setShowRentBikeModal] = useState(false);
  const [showCancelReserveModal, setShowCancelReserveModal] = useState(false);
  const [showBikeHistoryModal, setShowBikeHistoryModal] = useState(false);

  const [bikeData, setBikeData] = useState({});
  const [bikeToCancel, setBikeToCancel] = useState(null);
  const [bikeHistory, setBikeHistory] = useState(null);
  const [filteredBikeList, setFilteredBikeList] = useState(null);
  const [requestedDates, setRequestedDates] = useState([]);

  const [searchFilterId, setSearchFilterId] = useState("");
  const [searchFilterLocation, setSearchFilterLocation] = useState("");

  const bikeList = useSelector((state) => state.bikes.bikeList);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isManager = userInfo && userInfo.isManager;

  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;

  const onSearchLocationHandler = (e) => {
    setSearchFilterLocation(e.target.value);
  };
  const onSearchIdHandler = (e) => {
    setSearchFilterId(e.target.value);
  };

  const deleteBike = async (id) => {
    await deleteDoc(
      doc(firebase.firestore(), globalConstants.COLLECTIONS.BIKES, id)
    );
    dispatch(getBikes());
  };

  const rateBike = (rate, bike) => {
    const prevRating =
      bike.ratingList &&
      bike.ratingList.find((ratingObj) => ratingObj.id === userInfo.uid);
    if (prevRating) {
      firebase
        .firestore()
        .collection(globalConstants.COLLECTIONS.BIKES)
        .doc(bike.id)
        .update({
          ratingList: firebase.firestore.FieldValue.arrayRemove(prevRating),
        });
    }
    firebase
      .firestore()
      .collection(globalConstants.COLLECTIONS.BIKES)
      .doc(bike.id)
      .update({
        ratingList: firebase.firestore.FieldValue.arrayUnion({
          rating: rate,
          id: userInfo.uid,
        }),
      });
    message.success(constants.RATE_BIKE_SUCCESS_MESSAGE);
    dispatch(getBikes());
  };

  const closeBikeModal = () => {
    setShowBikeModal(false);
    setShowRentBikeModal(false);
    setShowCancelReserveModal(false);
    setShowBikeHistoryModal(false);
    setBikeHistory(null);
    setBikeToCancel(null);
  };

  const handleShowBikeModal = (id) => {
    setBikeData(bikeList.find((bike) => bike.id === id));
    setShowBikeModal(true);
  };

  const handleShowRentBikeModal = (id) => {
    setBikeData(bikeList.find((bike) => bike.id === id));
    setShowRentBikeModal(true);
  };

  const handleShowBikeHistoryModal = (bike) => {
    setShowBikeHistoryModal(true);
    setBikeHistory(bike.rentList);
  };

  const handleCancelReserve = (bike) => {
    setShowCancelReserveModal(true);
    setBikeToCancel(bike);
  };

  const handleCopyToClipboardBike = (id) => {
    navigator.clipboard.writeText(id);
    message.success(constants.COPY_TO_CLIPBOARD_BIKE_MESSAGE);
  };

  useEffect(() => {
    if (!bikeList.length) {
      dispatch(getBikes());
    }
  }, [dispatch, bikeList.length]);

  useEffect(() => {
    setRequestedDates([]);
  }, [currentList, bikeList]);

  useEffect(() => {
    setSearchFilterId("");
    setSearchFilterLocation("");
  }, [currentList]);

  useEffect(() => {
    let newList = [...bikeList];
    if (userInfo && bikeList.length && currentList) {
      if (currentList === constants.TABS.RESERVATIONS) {
        newList = bikeList.filter((bike) => {
          if (bike.rentList) {
            return bike.rentList.find((rent) => {
              return rent.by.id === userInfo.uid;
            });
          } else {
            return false;
          }
        });
      }
    }
    if (requestedDates && requestedDates.length > 0) {
      newList = newList.filter((bike) => {
        return isBikeAvailableOnRange(
          bike,
          requestedDates[0],
          requestedDates[1]
        );
      });
    }

    newList = newList.filter((bike) => {
      const containsIdFilter = bike.id.includes(searchFilterId);
      const containsLocationFilter = bike.location
        .toLowerCase()
        .includes(searchFilterLocation.toLowerCase());

      return containsIdFilter && containsLocationFilter;
    });

    setFilteredBikeList(newList);
  }, [
    userInfo,
    bikeList,
    currentList,
    requestedDates,
    searchFilterLocation,
    searchFilterId,
  ]);

  return (
    <>
      <SearchByTwo
        firstValue={searchFilterLocation}
        firstOnChange={onSearchLocationHandler}
        firstPlaceholder={constants.SEARCH_LOCATION_TEXT}
        secondOnChange={isManager && onSearchIdHandler}
        secondPlaceholder={constants.SEARCH_ID_TEXT}
        secondValue={searchFilterId}
      />
      {showBikeModal && (
        <BikeModal
          show={showBikeModal}
          cancelBikeAddModal={() => closeBikeModal()}
          title={constants.MODAL_TITLES.EDIT_BIKE}
          bikeData={bikeData}
          editing
        />
      )}
      {showRentBikeModal && (
        <RentBikeModal
          show={showRentBikeModal}
          cancelRentBikeModal={closeBikeModal}
          title={constants.MODAL_TITLES.RENT_BIKE}
          bikeData={bikeData}
        />
      )}
      {showCancelReserveModal && (
        <CancelBikeModal
          show={showCancelReserveModal}
          cancelCancelRentBikeModal={closeBikeModal}
          title={constants.MODAL_TITLES.CANCEL_BIKE_RESERVATION}
          bikeToCancel={bikeToCancel}
        />
      )}
      {showBikeHistoryModal && (
        <BikeHistoryModal
          show={showBikeHistoryModal}
          cancelBikeHistoryModal={closeBikeModal}
          title={constants.MODAL_TITLES.BIKE_HISTORY}
          bikeHistory={bikeHistory}
        />
      )}
      {!isManager && currentList !== constants.TABS.RESERVATIONS && (
        <RangePickerWrapperStyled>
          <RangePicker
            value={requestedDates}
            onChange={(dates) => setRequestedDates(dates)}
          />
        </RangePickerWrapperStyled>
      )}

      <BikeListWrapperStyled>
        {filteredBikeList && filteredBikeList.length > 0 ? (
          filteredBikeList.map((bike) => {
            const prevRating =
              userInfo &&
              bike.ratingList &&
              bike.ratingList.find(
                (ratingObj) => ratingObj.id === userInfo.uid
              );
            let ratingaverage = 5;
            if (bike.ratingList) {
              ratingaverage =
                bike.ratingList.reduce(
                  (total, next) => total + next.rating,
                  0
                ) / bike.ratingList.length;
            }
            ratingaverage = Math.round(ratingaverage * 2) / 2;
            return (
              <Card
                key={bike.id}
                title={bike.location}
                bordered={true}
                style={{ width: 240, margin: 4 }}
              >
                {isManager && (
                  <Button
                    onClick={() => handleShowBikeHistoryModal(bike)}
                    style={{ ...historyButtonStyled }}
                  >
                    {constants.HISTORY_BUTTON_PROPS.text}
                  </Button>
                )}
                <IconWrapperStyled
                  style={isManager ? { ...iconPointerStyleIfManager } : {}}
                  onClick={() =>
                    isManager && handleCopyToClipboardBike(bike.id)
                  }
                >
                  <Icon icon={bike.model} color={bike.color} />
                </IconWrapperStyled>
                <RatingWrapperStyled>
                  <RatingTitleStyled>
                    {constants.AVERAGE_RATING_TEXT}
                  </RatingTitleStyled>
                  <Rate disabled={true} allowHalf value={ratingaverage} />
                </RatingWrapperStyled>
                <Divider />
                {currentList === constants.TABS.RESERVATIONS && (
                  <RatingWrapperStyled>
                    <RatingTitleStyled>
                      {constants.YOUR_RATING_TEXT}
                    </RatingTitleStyled>
                    <Rate
                      allowHalf
                      disabled={currentList !== constants.TABS.RESERVATIONS}
                      defaultValue={(prevRating && prevRating.rating) || 5}
                      onChange={(val) => rateBike(val, bike)}
                    />
                  </RatingWrapperStyled>
                )}
                <BikeModelWrapperStyled>
                  <ModelTextTitleStyled>
                    {
                      globalConstants.BIKE_MODELS.OPTIONS.find(
                        (option) => bike.model === option.value
                      ).label
                    }
                  </ModelTextTitleStyled>
                </BikeModelWrapperStyled>
                {isManager && (
                  <ButtonWrapperStyled>
                    <Button
                      style={{ width: 80, margin: 4 }}
                      onClick={() => handleShowBikeModal(bike.id)}
                    >
                      {constants.EDIT_BUTTON_PROPS.text}
                    </Button>
                    <Popconfirm
                      {...constants.POPCONFIRM_PROPS}
                      onConfirm={() => deleteBike(bike.id)}
                    >
                      <Button style={{ width: 80, margin: 4 }}>
                        {constants.DELETE_BUTTON_PROPS.text}
                      </Button>
                    </Popconfirm>
                  </ButtonWrapperStyled>
                )}
                {currentList === constants.TABS.BIKES && !isManager && (
                  <ButtonWrapperStyled>
                    <Button
                      style={{ width: 80, margin: 4 }}
                      onClick={() => handleShowRentBikeModal(bike.id)}
                    >
                      {constants.RENT_BUTTON_PROPS.text}
                    </Button>
                  </ButtonWrapperStyled>
                )}
                {currentList === constants.TABS.RESERVATIONS &&
                  hasOngoingReservation(bike.id, filteredBikeList) && (
                    <ButtonWrapperStyled>
                      <Button
                        style={{ width: 80, margin: 4 }}
                        onClick={() => handleCancelReserve(bike)}
                      >
                        {constants.CANCEL_BUTTON_PROPS.text}
                      </Button>
                    </ButtonWrapperStyled>
                  )}
              </Card>
            );
          })
        ) : (
          <NoMatchingResultsTextStyled>
            {constants.NO_MATCHING_RESULTS_TEXT}
          </NoMatchingResultsTextStyled>
        )}
      </BikeListWrapperStyled>
    </>
  );
};

export default BikeList;
