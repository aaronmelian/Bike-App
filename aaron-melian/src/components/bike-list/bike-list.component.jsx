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
import Icon from "../icon/icon.component";

// Constants
import { globalConstants } from "../../globalConstants/globalConstants.constants";

// AntD
import { Card, Rate, Button, Popconfirm } from "antd";

// Styles
import {
  BikeListWrapperStyled,
  IconWrapperStyled,
  BikeModelWrapperStyled,
  EditRemoveButtonWrapperStyled,
  SpaceStyled,
} from "./bike-list.component.styled";

const BikeList = () => {
  const [showBikeModal, setShowBikeModal] = useState(false);
  const [bikeData, setBikeData] = useState({});

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

  const cancelBikeModal = () => {
    setShowBikeModal(false);
  };

  const handleShowBikeModal = (id) => {
    setBikeData(bikeList.find((bike) => bike.id === id));
    setShowBikeModal(true);
  };

  useEffect(() => {
    if (!bikeList.length) {
      dispatch(getBikes());
    }
  }, [dispatch, bikeList.length]);

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
      <BikeListWrapperStyled>
        {bikeList.length !== 0 &&
          bikeList.map((bike, i) => {
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
                {bike.rating ? (
                  <Rate allowHalf disabled defaultValue={bike.rating} />
                ) : (
                  <SpaceStyled />
                )}
                <BikeModelWrapperStyled>
                  {
                    globalConstants.BIKE_MODELS.OPTIONS.find(
                      (option) => bike.model === option.value
                    ).label
                  }
                </BikeModelWrapperStyled>
                {isManager && (
                  <EditRemoveButtonWrapperStyled>
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
                  </EditRemoveButtonWrapperStyled>
                )}
              </Card>
            );
          })}
      </BikeListWrapperStyled>
    </>
  );
};

export default BikeList;
