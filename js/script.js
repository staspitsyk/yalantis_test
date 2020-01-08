async function getUsers() {
  try {
    const url = 'https://yalantis-react-school.herokuapp.com/api/task0/users';
    const response = await fetch(url);
    const arrOfUsers = await response.json();
    for (let i = 0; i < arrOfUsers.length; i++) {
      addMonthKey(arrOfUsers[i]);
    }
    const countMonthOfTheYear = counMonthAppearance(arrOfUsers);
    const monthCollection = document.getElementsByClassName('user__list')[0].children;
    setMonthColor(monthCollection, countMonthOfTheYear);

    const renderUsersList = function (event) {
      const monthName = event.target.innerHTML.toLowerCase();
      const arrOfExectUsers = getarrOfExectUsers(arrOfUsers, monthName);

      renderUsers(arrOfExectUsers);
    };

    for (let i = 0; i < monthCollection.length; i++) {
      monthCollection[i].addEventListener('mouseover', renderUsersList);
    }
  } catch (error) {
    alert(error);
  }
}

getUsers();

function addMonthKey(obj) {
  const monthOfTheYear = {
    0: 'january',
    1: 'february',
    2: 'march',
    3: 'april',
    4: 'may',
    5: 'june',
    6: 'july',
    7: 'august',
    8: 'september',
    9: 'october',
    10: 'november',
    11: 'december',

  };
  const dateOfBirth = new Date(obj.dob);
  const month = dateOfBirth.getMonth();

  obj.month = monthOfTheYear[String(month)];
}

function counMonthAppearance(arrOfUsers) {
  const countMonthOfTheYear = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  for (let i = 0; i < arrOfUsers.length; i++) {
    countMonthOfTheYear[arrOfUsers[i].month]++;
  }

  return countMonthOfTheYear;
}

function setMonthColor(monthCollection, countMonthOfTheYear) {
  for (let i = 0; i < monthCollection.length; i++) {
    const key = monthCollection[i].innerHTML.toLocaleLowerCase();
    const monthCount = countMonthOfTheYear[key];
    if (monthCount <= 2) {
      monthCollection[i].className = 'user__month user__month--gray';
    } else if (monthCount <= 6) {
      monthCollection[i].className = 'user__month user__month--blue';
    } else if (monthCount <= 10) {
      monthCollection[i].className = 'user__month user__month--green';
    } else {
      monthCollection[i].className = 'user__month user__month--red';
    }
  }
}

function getarrOfExectUsers(arrOfUsers, monthName) {
  const arrOfExectUsers = [];
  for (let i = 0; i < arrOfUsers.length; i++) {
    if (monthName === arrOfUsers[i].month) {
      arrOfExectUsers.push(arrOfUsers[i]);
    }
  }
  return arrOfExectUsers;
}

function renderUsers(arrOfUsers) {
  const unorderedList = document.getElementsByClassName('user__list user__list--users')[0];
  unorderedList.innerHTML = '';
  const nameOfMonth = document.createElement('li');
  nameOfMonth.className = 'user__month user__month--no-number';
  nameOfMonth.innerHTML = `Month: ${arrOfUsers[0].month.toUpperCase()}`;
  unorderedList.append(nameOfMonth);
  for (let i = 0; i < arrOfUsers.length; i++) {
    const listItem = document.createElement('li');
    listItem.className = 'user__month';
    listItem.innerHTML = `${arrOfUsers[i].firstName} ${arrOfUsers[i].lastName}`;
    unorderedList.append(listItem);
  }
}
