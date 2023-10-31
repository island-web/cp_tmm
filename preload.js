const { ipcRenderer } = require('electron');

require('./src/js/.globals.js');
require('./src/js/.globals_f.js');





window.addEventListener('DOMContentLoaded', () => {
    $('#header-user').text('USER: ' + USER.name);

    everySeconds();

    


    sessionStorage.setItem('user', USER.name);
    sessionStorage.setItem('button', 'server');
    setMainHead('server');


})