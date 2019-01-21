import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import Header from './Header';
import Row from './Row';

const Infinite = require('react-infinite');

const processData = (rawData) => {
  if (!rawData.length) {
    return [];
  }

  let data = [...rawData];
  const row = rawData[0];
  if (_.isNil(row.id)) {
    data = data.map((r, index) => ({
      ...r,
      id: index
    }));
  }

  return data;
};

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
      data: processData(props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
      data: processData(nextProps.data)
    });
  }

  handleDeleteRow = (rowData) => {
    const { data } = this.state;

    this.setState({
      data: data.filter(row => row.id !== rowData.id)
    });
  }

  handleEditCell = (rowData) => {
    const { data } = this.state;

    this.setState({
      data: data.map(row => (row.id === rowData.id ? rowData : row))
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

  handleReorderColumns = (columns) => {
    this.setState({ columns });
  }

  render() {
    const { columns, config, data } = this.state;
    return (
      <Wrapper>
        <Header
          columns={columns}
          config={config}
          onCellClicked={this.handleSortOnColumn}
          onCellReordered={this.handleReorderColumns}
        />
        <Infinite containerHeight={500} elementHeight={33}>
          {data.map(rowData => (
            <Row
              key={rowData.id}
              columns={columns}
              rowData={rowData}
              onDeleteRow={this.handleDeleteRow}
              onEditCell={this.handleEditCell}
            />
          ))}
        </Infinite>
      </Wrapper>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
