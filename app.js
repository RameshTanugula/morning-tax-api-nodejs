const sql = require("./db/db");
// Requiring the module
const cors = require("cors");
const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const app = express();
app.use(express.json());
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// Handling '/' request
app.post('/register', (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    if (err) {
      res.send({ error: 'something went wrong' })
    } else {
      const queryData = `('${data.firstName}', '${data.lastName}', '${data.emailId}', '${data.mobileNo}','${hash}')`
      let dataQuery = `insert into users(first_name, last_name, email, mobile, password) VALUES ${queryData};`;
      sql.query(dataQuery, (dataErr, dataResult) => {
        if (dataErr) {
          res.send({ error: `Something went wrong ${dataErr}` });
        } else {
          res.send({ res: 'Data Saved Successfully' });
        }
      });

    }
  })
});
// login
app.post('/login', (req, res) => {
  const userName = req.body.userId;
  const password = req.body.Password;
  if (userName && password) {

    let query = `select * from users where email ='${userName}'`;
    sql.query(query, (err, data) => {
      if (data?.length > 0) {
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (err || !data || data.length === 0) {
            res.send({ error: 'Login Failed' });
          } else {
            res.send({ message: 'Login success', data:{firstName: data[0].first_name, lastName: data[0].last_name} });
          }
        });
      } else {
        res.send({ message: `Something went wrong` });
      }
    });
  } else {
    res.send({ message: 'Login falied' })
  }
});
app.listen(3000, () => {
  console.log('server listening on port 3000');
});