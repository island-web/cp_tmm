global.path = require('path'); 
global.fs = require('fs-extra');
global.os = require('os');


const io = require('socket.io-client');
const host = 'http://web-island.space';
const port = 3030;

global.USER = {
    name: 'Oleg Schokun',
    id: "shol2017",
    room: "_rooms_admin",
    name_room_cl: "",
    status: "ADMIN"
}

const data_connect = {
    id: USER.id,
    name: USER.name,
    room: USER.room,
    info: {
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        hostname: os.hostname(),
        cpus: os.cpus()
    }
};

global.SOCK = io(`${host}:${port}`, { auth: { room: USER.room, data: data_connect } });



//VISUAL
global.BLOCK_SERVER = document.getElementById('server');