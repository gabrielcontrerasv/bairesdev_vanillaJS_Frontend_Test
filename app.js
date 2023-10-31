let sortOrder = 1;

const fetchData = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const compareUsers = (a, b) => {
  return sortOrder * (a.id - b.id);
};

const filterUsers = (users, searchTerm) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return users.filter((user) =>
    user.name.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

const renderUsers = (users) => {
  const usersTable = document.querySelector("#users-list table tbody");
  usersTable.innerHTML = "";

  usersTable.innerHTML = users
    .map(
      (user) => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
    </tr>
  `
    )
    .join("");
};

const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const sortBtn = document.getElementById("sort-btn");

let users = [];

searchBtn.addEventListener("click", async () => {
  const searchTerm = search.value;
  const filteredUsers = filterUsers(users, searchTerm);
  renderUsers(filteredUsers);
});

search.addEventListener("input", async () => {
  const searchTerm = search.value;
  const filteredUsers = filterUsers(users, searchTerm);
  renderUsers(filteredUsers);
});

sortBtn.addEventListener("click", () => {
  sortOrder = -sortOrder;
  const sortedUsers = [...users].sort(compareUsers);
  renderUsers(sortedUsers);
});

window.addEventListener("load", async () => {
  try {
    users = await fetchData("https://jsonplaceholder.typicode.com/users");
    renderUsers(users);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
});
