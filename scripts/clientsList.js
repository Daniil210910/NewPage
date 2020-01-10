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

function displayData(clientsList = clients) {
  clearList()
  const ul = document.querySelector('#clientsData');
  sumAmount(clientsList);
  clientsList.forEach(client => {
    const newLi = document.createElement('li');
    newLi.className = 'media';
    const avatar = document.createElement('img');
    avatar.className = 'mr-3 align-self-center';
    const div = document.createElement('div');
    div.className = 'media-body';
    const mailLink = document.createElement('a');
    avatar.setAttribute('src', client.avatar);
    const textPart1 = document.createTextNode(
      `${client.last_name} ${client.first_name} - `
    );
    mailLink.setAttribute('href', `mailto:${client.email}`)
    mailLink.innerHTML = client.email;
    const textPart2 = document.createTextNode(`${client.email}, ${client.gender} (${client.date} - ${client.amount})`);
    div.appendChild(textPart1);
    div.appendChild(mailLink);
    div.appendChild(textPart2);
    newLi.appendChild(avatar);
    newLi.appendChild(div);
    ul.appendChild(newLi);
  });
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
    console.log(clients);
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


function addClient() {
  const data = {
    id: 49,
    first_name: 'Neils',
    last_name: 'Gourley',
    email: 'ngourley1c@examiner.com',
    gender: 'Male',
    amount: '$3.70',
    date: '5/29/2019',
    avatar: 'https://robohash.org/doloreliberofacere.jpg?size=50x50&set=set1'
  };

  const newId = database.ref().child('clients').push().key;
  let updates = {};
  updates[`clients/${newId}`] = data;
  database.ref().update(updates, function (error) {
    if (error) {
      console.error("New client was not added! Error occured!");
    } else {
      console.log("Data added to database!");
    }
  });
  console.log()
};

function logOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = "http://127.0.0.1:5501/login.html"
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}





