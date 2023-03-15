import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sanjaya123',
  database: 'test',
});

app.get('/', (req, res) => {
  res.json('this is the backend');
});

app.get('/product', (req, res) => {
  const q = 'SELECT * FROM product';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/product', (req, res) => {
  const q =
    'INSERT INTO product (`title`, `desc`, `price`, `cover`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Product has been created successfully');
  });
});

app.delete('/product/:id', (req, res) => {
  const productId = req.params.id;
  const q = 'DELETE FROM product WHERE id = ?';

  db.query(q, [productId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Product has been deleted successfully');
  });
});

app.put('/product/:id', (req, res) => {
  const productId = req.params.id;
  const q =
    'UPDATE product SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, productId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Product has been updated successfully');
  });
});

app.listen(8800, () => {
  console.log('Connected to backend');
});
