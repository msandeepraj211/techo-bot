'use strict';
let app = require('express')();
let bodyParser = require('body-parser');
let http = require('http').Server(app);
let io = require('socket.io')(http);

const Data = require('./data-layer');

const PORT=8080; 

const userInLine = [];

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('reciveData', (message) => {
    io.emit('sendDataFromServer', {type:'data', text: message});    
  });

  socket.on('sendMessage', function(data) {
      if(data === 1) {
        io.emit('reciveMessage', {type:1, message : 'Go to B'});
      };
      if(data === 0) {
        io.emit('reciveMessage', {type:0 , message : 'Go to Standby'});
      }
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/facedetector/:id', function(req, res){
    let id = req.params.id;
    if(userInLine.indexOf(id) !== -1 ) {
        return res.send(id);
    }
    userInLine.push(id);
    console.log(id);
    res.send(id);

})

app.get('/', function(req, res) {
     res.json({
         status: '200',
         message: 'Server Running successfully'
     });
})

http.listen(PORT, () => {
  console.log(`started on port ${PORT}`);
});
// fs.readFile('./header-footer.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });