const { ipcRenderer } = require('electron');
require('./js/.globals.js');
require('./js/.globals_f.js');


window.addEventListener('DOMContentLoaded', () => {
    SOCK.on('connect', () => { print('Successfully connected to the server', 'server', 'deff-log') });
    SOCK.on('error', (error) => { print('Connect error', 'server', 'error-log') });
    SOCK.on('disconnect', (reason) => { print('Disconnected from the server. Reason: ' + reason, 'server', 'error-log'); });
});



//events from main
ipcRenderer.on('show-rooms', () => { SOCK.emit('get_all_rooms'); setMainHead('rooms'); showRooms() })
ipcRenderer.on('server-info', () => { setMainHead('server') })


//events from server
SOCK.on('all_rooms', (rooms) => { sessionStorage.setItem('all_rooms', JSON.stringify(rooms)) })
SOCK.on('clients_for_edit_room', (clients) => { showClients(clients) });



const getClientsRoom = (id) => {
    const dataRoom = JSON.parse(sessionStorage.getItem('all_rooms')).filter((room) => room.id_room == id)[0];
    SOCK.emit('get_clients_room_edit', [dataRoom.id_room, dataRoom.name_room]);        
};
