const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000; // hoặc cổng tuỳ chọn

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('chat message', message);
  });
});

http.listen(port, () => {
  console.log('Server is running on port ' + port);
});
