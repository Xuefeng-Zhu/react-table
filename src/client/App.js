import React, { Component } from 'react';
import './app.css';

import Table from './components/table';

export default class App extends Component {
  render() {
    const columns = [{ name: 'name' }, { name: 'age' }];
    const data = [{ name: 'Frank', age: 18 }, { name: 'Tom', age: 20 }];
    return (
      <div className="container">
        <Table columns={columns} data={data} />
      </div>
    );
  }
}
