global.everySeconds = () => {
  const interval = setInterval(() => {
    $("#header-time").html(moment().format("HH:mm:ss"));
  }, 1000);
};

global.setMainHead = (text) => {
  $("#main-head").text(text);
  $(`#${sessionStorage.getItem("button")}`).css("display", "none");
  sessionStorage.setItem("button", text);
  $(`#${text}`).css("display", "block");
};

global.print = (text, name_div, type) => {
  const div = document.getElementById(name_div);
  const paragraph = document.createElement("p");
  paragraph.id = type;
  div.prepend(paragraph);
  let count = -1;
  let interval = setInterval(() => {
    count++;
    count < text.length
      ? (paragraph.innerHTML += text[count])
      : clearInterval(interval);
  }, 80);
};

global.showRooms = () => {
  const all_rooms = JSON.parse(sessionStorage.getItem("all_rooms"));
  const list_rooms = document.getElementById("list-rooms");
  list_rooms.innerHTML = "";
  for (let room of all_rooms) {
    const div_room = document.createElement("div");
    div_room.className = "room";
    div_room.id = room.name;
    div_room.innerHTML = `<p class="room-name" id="${room.id_room}" onclick="getClientsRoom(this.id)">${room.name_room}</p>`;
    list_rooms.prepend(div_room);
  }
};

global.showClients = (data) => {
  console.log(data);
  const list_offline = document.getElementById("list-clients-offline");
  const list_online = document.getElementById("list-clients-online");
  list_offline.innerHTML = "";
  list_online.innerHTML = "";

  for (let client of data.offline) {
    const div_client = document.createElement("div");
    div_client.className = "offline-client";
    div_client.id = client.id;
    div_client.innerHTML = `<p class="client-name">${client.name}</p>`;
    div_client.addEventListener("click", () => {
      console.log(client);
    });
    list_offline.prepend(div_client);
  }

  for (let client of data.online) {
    const div_client = document.createElement("div");
    div_client.className = "online-client";
    div_client.id = client.id;
    div_client.innerHTML = `<p class="client-name">${client.name}</p>`;
    list_online.prepend(div_client);
  }
};
