require('./.globals.js');
require('./.globals_f.js');




SOCK.on('connect', () => { console.log('Successfully connected to the server.') });
SOCK.on('error', (error) => { console.error('Socket error:', error) });
SOCK.on('disconnect', (reason) => { console.log('Disconnected from the server. Reason: ' + reason) });

SOCK.on('all_rooms', (rooms) => { send_msg("update_rooms", rooms) });











function getRooms() {
  return new Promise((resolve, reject) => {
    socket.emit('get-rooms', (data) => {
      resolve(data);
    });
  });
}