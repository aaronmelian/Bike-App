// React
import React from "react"
// AntD
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// Styles
import {
  inputStyled,
  SearchControlsWrapperStyled,
  SearchIconStyled,
  SearchInputWrapperStyled,
} from "./search-by-two.component.styled";

const SearchByTwo = ({
  firstOnChange,
  firstPlaceholder,
  firstValue,
  secondOnChange,
  secondPlaceholder,
  secondValue,
}) => {
  return (
    <SearchControlsWrapperStyled>
      <SearchInputWrapperStyled>
        <Input
          value={firstValue}
          placeholder={firstPlaceholder}
          allowClear
          onChange={firstOnChange}
          style={{ ...inputStyled }}
        />
        <SearchIconStyled>
          <SearchOutlined />
        </SearchIconStyled>
      </SearchInputWrapperStyled>
      {secondOnChange && (
        <SearchInputWrapperStyled>
          <Input
            value={secondValue}
            placeholder={secondPlaceholder}
            allowClear
            onChange={secondOnChange}
            style={{ ...inputStyled }}
          />
          <SearchIconStyled>
            <SearchOutlined />
          </SearchIconStyled>
        </SearchInputWrapperStyled>
      )}
    </SearchControlsWrapperStyled>
  );
};

export default SearchByTwo;
