import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  flex: 1,
  background: isDragging ? 'lightgreen' : 'none',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  overflow: 'auto',
});

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

  handleCellDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { columns, onCellReordered } = this.props;
    const source = result.source.index;
    const destination = result.destination.index;
    [columns[source], columns[destination]] = [columns[destination], columns[source]];

    onCellReordered(columns);
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
      <DragDropContext onDragEnd={this.handleCellDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {columns.map(({ name }, index) => (
                <Draggable key={name} draggableId={name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Block key={name} data-name={name} onClick={this.handleCellClick}>
                        {name}
                        {this.renderSort(name, sort)}
                      </Block>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.shape({
    sort: PropTypes.object
  }).isRequired,
  onCellClicked: PropTypes.func.isRequired,
  onCellReordered: PropTypes.func.isRequired
};
