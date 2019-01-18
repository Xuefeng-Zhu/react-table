import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Row from './Row';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;


export default class Table extends Component {
  render() {
    const { columns, data } = this.props;
    return (
      <Wrapper>
        <Header columns={columns} />
        {data.map((rowData) => <Row columns={columns} rowData={rowData} />)}
      </Wrapper>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
