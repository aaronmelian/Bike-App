import styled from "styled-components";

export const BikeListWrapperStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 10px;
`;
BikeListWrapperStyled.displayName = "BikeListWrapperStyled";

export const IconWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 6px auto;
  min-width: 200px;
  width: 40%;
`;
IconWrapperStyled.displayName = "IconWrapperStyled";

export const BikeModelWrapperStyled = styled.div`
  margin-top: 20px;
`;
BikeModelWrapperStyled.displayName = "BikeModelWrapperStyled";

export const ButtonWrapperStyled = styled.div`
  justify-content: center;
  margin: 0 auto;
  margin-top: 12px;
  width: 100%;
`;
ButtonWrapperStyled.displayName = "ButtonWrapperStyled";

export const RatingWrapperStyled = styled.div`
  margin: 10 auto;
`;
RatingWrapperStyled.displayName = "RatingWrapperStyled";

export const RatingTitleStyled = styled.h5`
  justify-content: center;
  margin: 0 auto;
  margin-top: 12px;
  width: 100%;
`;
RatingTitleStyled.displayName = "RatingTitleStyled";

export const ModelTextTitleStyled = styled.h4`
  text-align: center;
`;
ModelTextTitleStyled.displayName = "ModelTextTitleStyled";

export const RangePickerWrapperStyled = styled.h4`
  margin: 10px auto;
`;
RangePickerWrapperStyled.displayName = "RangePickerWrapperStyled";

export const historyButtonStyled = {
  marginBottom: "10px",
};

export const iconPointerStyleIfManager = {
  cursor: "pointer",
};

export const NoMatchingResultsTextStyled = styled.p`
  cursor: pointer;
  font-size: 150%;
  font-weight: 700;
  margin: 60px auto;
`;
NoMatchingResultsTextStyled.displayName = "NoMatchingResultsTextStyled";
