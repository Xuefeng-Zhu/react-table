import React, { Component } from 'react';
import styled from 'styled-components';

const Block = styled.div`
  font-size: 1.5em;
  text-align: center;
  height: 10px;
`;

export default class Cell extends Component {
  render() {
    return (
      <Block>
        Test
      </Block>
    );
  }
}
