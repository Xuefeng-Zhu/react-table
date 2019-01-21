import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';

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
  cursor: pointer;
  font-weight: bold;
`;

export default class Header extends Component {
  handleCellClick = (e) => {
    const { onCellClicked } = this.props;
    onCellClicked(e.target.dataset.name);
  }

  renderSort = (name, sort) => {
    if (name !== sort.name) {
      return null;
    }

    if (sort.direction === 'asc') {
      return <Icon type="arrow-up" />;
    }

    return <Icon type="arrow-down" />;
  }

  render() {
    const { columns, config: { sort = {} } } = this.props;
    return (
      <Wrapper>
        {
          columns.map(({ name }) => (
            <Block key={name} data-name={name} onClick={this.handleCellClick}>
              {name}
              {this.renderSort(name, sort)}
            </Block>
          ))
        }
      </Wrapper>
    );
  }
}

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.object.isRequired,
  onCellClicked: PropTypes.func.isRequired
};
