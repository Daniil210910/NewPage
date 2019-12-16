function displayData(clientsList = clients) {
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
      `${client.lastName} ${client.firstName} - `
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
    const filteredClients = clients.filter((client) => {
      return client.firstName.toLowerCase().includes(filterString) ||
        client.lastName.toLowerCase().includes(filterString) ||
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






