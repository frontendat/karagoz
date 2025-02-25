import express from 'express'

const app = express()
const port = 3111

app.get('/api/message', (req, res) => {
  setTimeout(() => res.send('Welcome to a WebContainers app! 🥳'), 1000)
})
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log('App is live at http://localhost:' + port)
})
