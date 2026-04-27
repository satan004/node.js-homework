import express from 'express'
import mysql from 'mysql2'

const app = express()
app.use(express.json())

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
})

db.connect(err => {
  if (err) throw err
  console.log('MySQL Connected...')
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// create user
app.post('/users', (req, res) => {
  const { name } = req.body
  db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
    if (err) throw err
    res.status(201).json({ id: result.insertId, name })
  })
})

// update user
app.put('/users/:id', (req, res) => {
  const { name } = req.body
  const { id } = req.params

  db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err) => {
    if (err) throw err
    res.json({ message: 'User updated' })
  })
})

// delete user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params

  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err
    res.json({ message: 'User deleted' })
  })
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})