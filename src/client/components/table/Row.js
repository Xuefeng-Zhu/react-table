import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input, Modal } from 'antd';

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
  flex:  ${props => props.width} 1 0%;
  align-items: center;
  justify-content: center;
  border: solid gray 1px;
  padding: 5px 0;
`;

export default class Row extends Component {
  state = {}

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

  handleDoubleClickCell = (e) => {
    this.setState({
      editingCell: e.target.dataset.name
    });
  }

  handleEditCell = (e) => {
    const { onEditCell, rowData } = this.props;
    const { editingCell } = this.state;

    onEditCell({
      ...rowData,
      [editingCell]: e.target.value
    });

    this.setState({
      editingCell: undefined
    });
  }

  renderCell = ({ name, width }, rowData) => {
    const { editingCell } = this.state;
    let content = rowData[name];

    if (name === editingCell) {
      content = (<Input defaultValue={content} onPressEnter={this.handleEditCell} />);
    }

    return (
      <Block
        key={name}
        data-name={name}
        onDoubleClick={this.handleDoubleClickCell}
        width={width}
      >
        {content}
      </Block>
    );
  }

  render() {
    const { columns, rowData } = this.props;
    return (
      <Wrapper>
        <Button type="danger" icon="close" style={{ position: 'absolute' }} onClick={this.handleDeleteRow} />
        {
          columns.map(column => this.renderCell(column, rowData))
        }
      </Wrapper>
    );
  }
}

Row.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.object.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onEditCell: PropTypes.func.isRequired,
};
