// React
import React, { useEffect, useState } from "react";

// Firebase
import firebase from "../../fbConfig";
import { doc, deleteDoc } from "firebase/firestore";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBikes } from "../../store/actions/bikeActions";

// Components
import BikeModal from "../bike-modal/bike-modal.component";
import RentBikeModal from "../rent-bike-modal/rent-bike-modal.component";
import Icon from "../icon/icon.component";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// AntD
import { Card, Rate, Button, Popconfirm, message } from "antd";

// Styles
import {
  BikeListWrapperStyled,
  IconWrapperStyled,
  BikeModelWrapperStyled,
  ButtonWrapperStyled,
} from "./bike-list.component.styled";

const BikeList = ({ currentList }) => {
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [showRentBikeModal, setShowRentBikeModal] = useState(false);
  const [bikeData, setBikeData] = useState({});
  const [filteredBikeList, setFilteredBikeList] = useState(null);

  const bikeList = useSelector((state) => state.bikes.bikeList);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isManager = userInfo && userInfo.isManager;

  const dispatch = useDispatch();

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
        .collection("bikes")
        .doc(bike.id)
        .update({
          ratingList: firebase.firestore.FieldValue.arrayRemove(prevRating),
        });
    }
    firebase
      .firestore()
      .collection("bikes")
      .doc(bike.id)
      .update({
        ratingList: firebase.firestore.FieldValue.arrayUnion({
          rating: rate,
          id: userInfo.uid,
        }),
      });
    message.success("Bike rated!!");
    dispatch(getBikes());
  };

  const cancelBikeModal = () => {
    setShowBikeModal(false);
    setShowRentBikeModal(false);
  };

  const handleShowBikeModal = (id) => {
    setBikeData(bikeList.find((bike) => bike.id === id));
    setShowBikeModal(true);
  };

  const handleShowRentBikeModal = (id) => {
    setBikeData(bikeList.find((bike) => bike.id === id));
    setShowRentBikeModal(true);
  };

  useEffect(() => {
    if (!bikeList.length) {
      dispatch(getBikes());
    }
  }, [dispatch, bikeList.length]);

  useEffect(() => {
    if (userInfo && bikeList.length && currentList) {
      if (currentList === "Rate") {
        setFilteredBikeList(
          bikeList.filter((bike) => {
            if (bike.rentList) {
              return bike.rentList.find((rent) => {
                return rent.by.id === userInfo.uid;
              });
            } else {
              return false;
            }
          })
        );
      } else if (currentList === "Bikes") {
        setFilteredBikeList(bikeList.filter((bike) => !bike.rented));
      }
    }
  }, [userInfo, bikeList, currentList]);

  return (
    <>
      {showBikeModal && (
        <BikeModal
          show={showBikeModal}
          cancelUserModal={cancelBikeModal}
          title={"Edit this Bike!"}
          bikeData={bikeData}
          editing
        />
      )}
      {showRentBikeModal && (
        <RentBikeModal
          show={showRentBikeModal}
          cancelUserModal={cancelBikeModal}
          title={"Rent this Bike!"}
          bikeData={bikeData}
          editing
        />
      )}
      <BikeListWrapperStyled>
        {bikeList.length !== 0 &&
          (filteredBikeList || bikeList).map((bike, i) => {
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
                <IconWrapperStyled>
                  <Icon icon={bike.model} color={bike.color} />
                </IconWrapperStyled>
                <div>
                  <p>Av. Rating:</p>
                  <Rate disabled={true} allowHalf value={ratingaverage} />
                </div>
                {currentList === "Rate" && (
                  <div>
                    <p>Your Rating:</p>
                    <Rate
                      allowHalf
                      disabled={currentList !== "Rate"}
                      defaultValue={(prevRating && prevRating.rating) || 5}
                      onChange={(val) => rateBike(val, bike)}
                    />
                  </div>
                )}
                <BikeModelWrapperStyled>
                  {
                    globalConstants.BIKE_MODELS.OPTIONS.find(
                      (option) => bike.model === option.value
                    ).label
                  }
                </BikeModelWrapperStyled>
                {isManager && (
                  <ButtonWrapperStyled>
                    <Button
                      style={{ width: 80, margin: 4 }}
                      onClick={() => handleShowBikeModal(bike.id)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      placement="topRight"
                      title={"Are you sure to delete this bike?"}
                      onConfirm={() => deleteBike(bike.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button style={{ width: 80, margin: 4 }}>Delete</Button>
                    </Popconfirm>
                  </ButtonWrapperStyled>
                )}
                {currentList === "Bikes" && (
                  <ButtonWrapperStyled>
                    <Button
                      style={{ width: 80, margin: 4 }}
                      onClick={() => handleShowRentBikeModal(bike.id)}
                    >
                      Rent
                    </Button>
                  </ButtonWrapperStyled>
                )}
              </Card>
            );
          })}
      </BikeListWrapperStyled>
    </>
  );
};

export default BikeList;
