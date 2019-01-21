import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import Header from './Header';
import Row from './Row';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;


export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      columns: props.columns,
      data: props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
      data: nextProps.data
    });
  }

  handleSortOnColumn = (columnName) => {
    let { data } = this.state;
    const { config } = this.state;
    let { sort } = config;

    if (!sort || sort.name !== columnName) {
      sort = {
        name: columnName,
        direction: 'asc'
      };
    } else if (sort.direction === 'asc') {
      sort.direction = 'desc';
    } else {
      sort = {};
    }

    if (sort.name) {
      data = _.orderBy(data, [sort.name], [sort.direction]);
    }

    this.setState({
      data,
      config: { ...config, sort }
    });
  }

  render() {
    const { columns, config, data } = this.state;
    return (
      <Wrapper>
        <Header columns={columns} config={config} onCellClicked={this.handleSortOnColumn} />
        {data.map((rowData, index) => <Row key={index} columns={columns} rowData={rowData} />)}
      </Wrapper>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
