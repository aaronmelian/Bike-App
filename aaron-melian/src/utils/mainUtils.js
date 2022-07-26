// moment
import moment from "moment";

// Constants
import { globalConstants } from "../globalConstants/globalConstants.constants";

export const momentConfig = (date) => {
  if (date) {
    return moment(date, globalConstants.DATE_FORMAT);
  }
  return moment();
};

export const momentToMMDDYYYY = (moment) => {
  return momentConfig(moment, globalConstants.DATE_FORMAT).format(
    globalConstants.DATE_FORMAT
  );
};

export const isBikeAvailableOnRange = (bikeData, date1, date2) => {
  let available = true;
  if (bikeData.rentList && bikeData.rentList.length > 0) {
    bikeData.rentList.forEach((rentObj) => {
      if (rentObj) {
        if (
          momentConfig(rentObj.rentStart).startOf(globalConstants.DAY) >=
            momentConfig(date1).startOf(globalConstants.DAY) &&
          momentConfig(rentObj.rentStart).endOf(globalConstants.DAY) <=
            momentConfig(date2).endOf(globalConstants.DAY)
        ) {
          available = false;
        } else if (
          momentConfig(rentObj.rentEnd).startOf(globalConstants.DAY) >=
            momentConfig(date1).startOf(globalConstants.DAY) &&
          momentConfig(rentObj.rentEnd).endOf(globalConstants.DAY) <=
            momentConfig(date2).endOf(globalConstants.DAY)
        ) {
          available = false;
        }
      }
    });
  }
  return available;
};

export const hasOngoingReservation = (bikeId, bikeList) => {
  let onGoing = false;
  const currentBike = bikeList.find((bike) => bike.id === bikeId);
  if (currentBike.rentList && currentBike.rentList.length > 0) {
    currentBike.rentList.forEach((rent) => {
      if (momentConfig(rent.rentEnd).endOf(globalConstants.DAY) >= moment()) {
        onGoing = true;
      }
    });
  }
  return onGoing;
};

export const isDateContainedInTwoDates = (dateToTest, start, end) => {
  return (
    momentConfig(dateToTest).startOf(globalConstants.DAY) >=
      momentConfig(start).startOf(globalConstants.DAY) &&
    momentConfig(dateToTest).endOf(globalConstants.DAY) <=
      momentConfig(end).endOf(globalConstants.DAY)
  );
};
