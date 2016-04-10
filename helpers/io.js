module.exports = function (io) {

  io.on('connection', run);

  function run(socket) {
    // login app, login social
    socket.on("user-login", function (data) {
      socket.join('user' + data, function () {
        io.in('user' + data).emit('user-login', "hello " + data)
      });
    });

    // auto login with token
    socket.on('auto-login', function (data) {
      socket.join('user' + data, function () {
        io.in('user' + data).emit('user-login', "hello " + data)
      });
    });

    // logout user
    socket.on('user-logout', function (data) {
      socket.leave('user' + data)
    });

    socket.on('disconnect', function (data) {

    });
  }
};
