firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // let displayName = user.displayName;
    let email = user.email;
    alert('Hello ' + email);
    // let emailVerified = user.emailVerified;
    // let photoURL = user.photoURL;
    // let isAnonymous = user.isAnonymous;
    // let uid = user.uid;
    // let providerData = user.providerData;
    // ...
  } else {
    window.location.href = "http://127.0.0.1:5501/login.html";
    // User is signed out.
    // ...
  }
});


const newClientForm = document.querySelector("#newClientForm");
const modalFooter = document.querySelector("#saveClients");
modalFooter.addEventListener("click", event => {
  event.preventDefault();
  addClient(newClientForm);
});

const editClientForm = document.querySelector("#editClientForm");
const editClientSave = document.querySelector("#editClient");
editClientSave.addEventListener("click", event => {
  event.preventDefault();
  editClient(editClientForm);
});


function displayData(clientsList = clients) {
  clearList()
  const ul = document.querySelector('#clientsData');
  for (const property in clientsList) {
    console.log(`${property}: ${clientsList[property]}`);
    ul.appendChild(getLiElement(clientsList[property], property));
  }
  sumAmount(clientsList);
  // clientsList.forEach(client => {

  // });
}

function getLiElement(client, id) {
  const newLi = document.createElement('li');
  const avatar = document.createElement('img');
  newLi.className = 'media';
  newLi.id = id;
  avatar.className = 'mr-3 align-self-center';
  avatar.setAttribute('src', client.avatar);
  newLi.appendChild(avatar);
  newLi.appendChild(createClientDescrirption(client, id));
  return newLi;
}

function createClientDescrirption(client, id) {
  const div = document.createElement('div');
  div.className = 'media-body';
  const mailLink = document.createElement('a');
  mailLink.setAttribute('href', `mailto:${client.email}`)
  mailLink.innerHTML = client.email;
  const textPart1 = document.createTextNode(
    `${client.last_name} ${client.first_name} - `
  );
  const textPart2 = document.createTextNode(`${client.email}, ${client.gender} (${client.date} - ${client.amount})`);

  const deleteLink = document.createElement('a');
  deleteLink.innerHTML = " Delete";
  deleteLink.setAttribute("href", "#");
  deleteLink.classList.add("mx-1");
  deleteLink.addEventListener("click", (event) => {
    event.preventDefault();
    deleteClient(id);
  });

  const editLink = createEditLink(id);

  div.appendChild(textPart1);
  div.appendChild(mailLink);
  div.appendChild(textPart2);
  div.appendChild(editLink);
  div.appendChild(deleteLink);
  return div;
}
{/* <a href="#" data-toggle="modal" data-target="#editClientModal">
  Launch demo modal
    </a> */}

function createEditLink(id) {
  const editLink = document.createElement('a');
  editLink.innerHTML = " Edit";
  editLink.setAttribute("href", "#");
  editLink.setAttribute("data-toggle", "modal");
  editLink.setAttribute("data-client-id", "id");
  editLink.classList.add("mx-1");
  editLink.classList.add("edit-klient-link");
  editLink.setAttribute("data-target", "#editClientModal");
  editLink.addEventListener("click", () => {
    fillClientForm(id);
  });
  return editLink;
}

function fillClientForm(id) {

  // const currentClient = clients.find(client => client.clientId == )
  if (editClientForm) {
    editClientForm.firstName.value = clients[id].first_name;
    editClientForm.lastName.value = clients[id].last_name;
    editClientForm.email.value = clients[id].email;
    editClientForm.gender.value = clients[id].gender;
    editClientForm.amount.value = clients[id].amount;
    editClientForm.date.value = clients[id].date;
    editClientForm.clientID.value = id;
    // console.log(clients[id]);
    console.log(id);
    console.log(clients[id]);
    console.log(clients);
  }

}

function editClient(form) {
  console.log(form.firstName.value);
  console.log(form);
  const data = {
    first_name: form.firstName.value,
    last_name: form.lastName.value,
    email: form.email.value,
    gender: form.gender.value,
    amount: form.amount.value,
    date: form.date.value
  };

  const id = form.clientID.value;
  let updates = {};
  updates[`clients/${id}`] = data;

  if (id) updateDB(updates);
  console.log(id, data);
}

function deleteClient(id) {
  const clientRef = database.ref(`clients/${id}`);
  clientRef.remove();
}

function sortList(order) {
  const sortedClients = clients.sort((lastClients, nextClients) => {
    if (order == "ascending") {
      return lastClients.lastName > nextClients.lastName ? 1 : -1;
    } else {
      return lastClients.lastName < nextClients.lastName ? 1 : -1;
    }
  });
  console.table(sortedClients);
  refreshData(sortedClients);
};

function sortGender(genderValue) {
  const filterGender = clients.filter((client) => {
    if (genderValue == 'Male') {
      return client.gender == genderValue;
    } else {
      return client.gender == genderValue;
    }
  });
  refreshData(filterGender);
}


function refreshData(updatedClients, filterGender) {
  clearList();
  displayData(updatedClients, filterGender);
}

function clearList() {
  const ul = document.querySelector('#clientsData');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function filterList() {
  const filterString = document.querySelector("#filterInput").value.toLowerCase().trim();
  if (filterString) {
    // console.log(clients);
    const filteredClients = clients.filter((client) => {
      return client.first_name.toLowerCase().includes(filterString) ||
        client.last_name.toLowerCase().includes(filterString) ||
        client.email.toLowerCase().includes(filterString) ||
        client.gender.toLowerCase().includes(filterString)
    });

    refreshData(filteredClients);
    if (filteredClients.length === 0) {
      document.querySelector(".resultList").style.display = "none";
      document.querySelector(".notFound").style.display = "block";
    } else {
      document.querySelector(".resultList").style.display = "block";
      document.querySelector(".notFound").style.display = "none";
    }


  } else {
    refreshData(clients);
    showResultListSection();
  }
}

function sumAmount(clientsList = clients) {
  const total = clientsList.reduce((amount, client) => {
    return amount + removeCurrencyFromAmount(client.amount);
  }, 0);

  document.querySelectorAll(".totalAmountContainer").forEach((element) => {
    element.innerHTML = total.toFixed(2);
  })
}

function removeCurrencyFromAmount(amount) {
  return Number(amount.slice(1));
}

function showResultListSection() {

}

function addClient(form) {
  console.log(form);
  const data = {
    first_name: form.firstName.value,
    last_name: form.lastName.value,
    email: form.email.value,
    gender: form.gender.value,
    amount: form.amount.value,
    date: form.date.value,
    avatar: form.photo.value
  };

  const newId = database.ref().child('clients').push().key;
  let updates = {};
  updates[`clients/${newId}`] = data;
  updateDB(updates);

};

function updateDB(updates) {
  database.ref().update(updates, function (error) {
    if (error) {
      console.error("New client was not added or was not saved! Error occured!");
    } else {
      console.log("Data added/saved to database!");
    }
  });
}

function logOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "http://127.0.0.1:5501/login.html"
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}





