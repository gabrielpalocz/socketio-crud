import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
const ENDPOINT = "http://192.168.0.9:9000";
const socket = io(ENDPOINT);

class User {
  #id;
  #nombre;


  constructor() {
    this.#id = '9';
    this.#nombre = 'mario';
  }

  toJSON() {
    return { id: this.#id, nombre: this.#nombre };
  }
}

console.log("here's a User:", new User());

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('pongBroadcast', () => {
      setLastPong(new Date().toISOString() + 'Broadcast'); // emitter do not recive
    });

    socket.on('getUsersEnvi', (data) => {
      setUsers(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('getUsersEnvi');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  const sendPingBroadcast = () => {
    socket.emit('pingBroadcast');    //send but do not recive
  }
  

  const sendWord = () => {
    socket.emit("word", "wordEnviado", (response) => {
      console.log(response); // "got it"
    });
  }
  const getData = () => {
    socket.emit("getData", (response) => {
      console.log(response); // "got it"
    });
  }



  //------------------ [ CRUD ] --------------------//

  //GET
  const getAllUsers = () => {
    socket.emit("getUsers", (response) => {
      var responseJson = JSON.parse(response)
      console.log(responseJson) // "rows"
      //setUsers(response)
    });
  }
  const getUser = () => {
    socket.emit("getUser", "3", (response) => {
      var responseJson = JSON.parse(response)
      console.log(responseJson); // "row"
    });
  }

  //POST
  const addIdUser = () => {
    socket.emit("addIdUser", { id: "6", name: "pipo" }, (response) => {
      console.log(response.status) // "ok"
    });
  }

  const addIdUser2 = () => {
    socket.emit("addIdUser2", new User(), (response) => {
      console.log(response.status) // "ok"
    });
  }

  const addUser = () => {
    socket.emit("addUser", { name: "toro" }, (response) => {
      console.log(response) // "ok"
    });
  }


  //PUT
  const putUser = () => {
    socket.emit("putUser", "4", { name: "pototote" }, (response) => {
      console.log(response) // "ok"
    });
  }

  //DELETE
  const deleteUser = () => {
    socket.emit("deleteUser", "8", (response) => {
      console.log(response) // "ok"
    });
  }


  //sending test
  const getUsersEnviado = () => {
    socket.emit('getUsersEnviado');
  }

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <p>Users={users}</p>

      <button onClick={sendPing}>Send ping</button>
      <button onClick={sendPingBroadcast}>sendPingBroadcast</button>
      <button onClick={sendWord}>Send word</button>
      <button onClick={getData}>getData</button>
      
      <button onClick={getAllUsers}>getUsers</button>
      <button onClick={getUser}>getUser</button>
      <button onClick={addIdUser}>addIdUser</button>
      <button onClick={addIdUser2}>addIdUser2</button>
      <button onClick={addUser}>addUser</button>
      <button onClick={putUser}>putUser</button>
      <button onClick={deleteUser}>deleteUser</button>
      <button onClick={getUsersEnviado}>getUsersEnviado</button>


    </div>
  );
}

export default App;
