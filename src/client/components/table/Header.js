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
  font-weight: bold;
`;

export default class Header extends Component {
  render() {
    const { columns } = this.props;
    return (
      <Wrapper>
        {
          columns.map(({ name }) => (<Block>{name}</Block>))
        }
      </Wrapper>
    );
  }
}

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
};
