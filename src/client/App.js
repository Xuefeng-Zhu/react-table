import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Layout, Spin, Input, Card
} from 'antd';

import Table from './components/table';

import './app.css';

const {
  Header, Content,
} = Layout;

const { Search } = Input;

const Title = styled.h2`
  color: white;
`;
export default class App extends Component {
  state = { loading: true }

  componentDidMount() {
    this.loadData();
  }

  loadData = (count = 100) => {
    this.setState({ loading: true });
    fetch('/api/getTableData', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ count: _.toNumber(count) })
    })
      .then(res => res.json())
      .then(res => this.setState({ ...res, loading: false }));
  }

  render() {
    const { columns, data, loading } = this.state;

    return (
      <Layout>
        <Header>
          <Title>
            Simple React Table
          </Title>
        </Header>
        <Content>
          <Card title={(
            <Search
              placeholder="enter the number of rows to load"
              onSearch={this.loadData}
            />
            )}
          >
            {!loading ? <Table columns={columns} data={data} /> : <Spin />}
          </Card>
        </Content>
      </Layout>
    );
  }
}
