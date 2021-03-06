const firebase = require("firebase/app");
require("firebase/database");

import { displayData } from "./clientsList.js";

let clients = [];

export function getData() {
  console.log("Get data")
  const database = firebase.database();
  const clientsRef = database.ref("clients");

  clientsRef.on("value", snapshot => {
    clients = convertObjToArray(snapshot.val());
    displayData(clients);
  });
}

function convertObjToArray(object) {
  return Object.keys(object).map(key => {
    return {
      clientID: key, ...object[key]
    };
  });
}

export { clients };

