// YOUR CODE HERE:
// app.init()

  // Parse.initialize(this)
var app={
  // was added to pass the spec Runner, but not required for fetch, fetch has its own url line for the server address
  server:'http://127.0.0.1:3000/classes/room1'
  // this.init()
};
// app.server = 'https://api.parse.com/1/classes/chatterbox'
app.init = function(){
  app.fetch()
};

app.send = function(message){
  $.ajax({
  url: app.server,
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
    success: function (data){
      console.log('chatterbox: Message sent');
    },
  error: function (data){
    console.error('chatterbox: Failed to send message');
  }
})};

//The fetched data only exists within the function
app.fetch = function(messages){
  $.ajax({
   url: app.server, 
  type: 'GET',
  data: JSON.stringify(message),
  contentType: 'application/json',
    success: function (data){
      console.log(data);
      console.log('chatterbox: Message fetched');
      for (var i=0; i<100; i++ ){
        app.addMessage(data.results[i]);
      }
      app.roomMaker(data);
    },
  error: function (data){
    console.error('chatterbox: Failed to fetch message');
  }
})};

app.clearMessages = function (){
  $('#chats').empty();
};

//Passed in argument is an object
app.addMessage = function (message){
  $message = $('<p class="chat"></p>');
  $username = $('<div class= "username"></div>');
  //Defense against Nick //Escape/ignore special characgters inside received message
  $username.text(message.username);
  //Grab the 'text' key's value from the message object
  $message.text(message.text);
  $username.append($message)
  $("#chats").append($username);
};

//Passed in argument is a string
app.addRoom = function (roomName){
 $newRoom = $('<div></div>');
 
 //Since the roomName is a string itself, no need to grab it out of the key
 $newRoom.append(roomName);
 $("#roomSelect").append($newRoom);
};

app.addFriend = function(name){
 console.log(name)
}

app.handleSubmit = function(message){
  app.send(message);
};

app.roomMaker = function(data){
  var differentRooms = [];
  for (var i = 0; i < 100; i++) {
    differentRooms.push(data.results[i].roomname);
  }
  for (var i=0; i<differentRooms.length; i++){
    var $room = $('<div></div>');
    $('#roomSelect').append($room);
  }
  console.log(differentRooms)
  var cleanUp = function(array){
    var result = {};
      for (var i = 0; i < array.length; i++) {
        if(array[i] && array[i] !== 'null'){
          result[array[i]]=true;
        }
      };
    console.log(result)
    return result;
  }
  cleanUp(differentRooms)
}



var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

$(document).ready(function(){
// If things break, wrap this inside
// dom ready jquery function
$('.refresh').on('click', function(event){
  event.preventDefault();
  app.clearMessages();
  app.fetch();
});





// STILL NEED to capture the data from the input

$('body').on('click', '.submit', function(event){
  event.preventDefault();

  var submittedMsgObj = {
    //edit user name later
    username: window.location.search,
    text: $('#message').val(),
    roomname: "TBA"
  };

  app.handleSubmit(submittedMsgObj);
})

$('body').on('click', '.username', function(event){
  event.preventDefault();
//  console.log(this[0],'value')
  //console.log('hello')
  app.addFriend($(this)[0].childNodes[0].data);
})
// LEFT OFF HERE!!!!!
// app.fetch();
// returns and array of objects
// iterate the fetched results( which are objects) and invoke addMessage on each one


app.init()



})















