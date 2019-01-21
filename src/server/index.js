const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json()); // for parsing application/json
app.post('/api/getTableData', (req, res) => {
  const { count = 100 } = req.body;
  const columns = [{ name: 'name' }, { name: 'age' }, { name: 'title' }, { name: 'phone' }];
  const data = [];

  for (let i = 0; i < count; i += 1) {
    data.push({
      name: faker.name.findName(),
      age: faker.random.number({ min: 1, max: 100 }),
      title: faker.name.title(),
      phone: faker.phone.phoneNumber()
    });
  }
  res.send({
    columns,
    data
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
