import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Modal } from 'antd';

const Wrapper = styled.div`
  display: flex;
  flex: 1;

  .ant-btn {
    display: none;
  }

  &:hover {
    .ant-btn {
      display: initial;
    }
  }
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
  handleDeleteRow = () => {
    const { onDeleteRow, rowData } = this.props;
    Modal.confirm({
      title: 'Are you sure delete this row?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeleteRow(rowData);
      },
    });
  }

  render() {
    const { columns, rowData } = this.props;
    return (
      <Wrapper>
        <Button type="danger" icon="close" style={{ position: 'absolute' }} onClick={this.handleDeleteRow} />
        {
          columns.map(({ name }) => (<Block key={name}>{rowData[name]}</Block>))
        }
      </Wrapper>
    );
  }
}

Row.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  onDeleteRow: PropTypes.func.isRequired
};
