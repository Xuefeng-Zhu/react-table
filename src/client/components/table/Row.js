import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Block = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: solid gray 1px;
  padding: 5px;
`;

export default class Row extends Component {
  render() {
    const { columns, rowData } = this.props;
    return (
      <Wrapper>
        {
          columns.map(({ name }) => (<Block key={name}>{rowData[name]}</Block>))
        }
      </Wrapper>
    );
  }
}

Row.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired
};
