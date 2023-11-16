const searchInput = document.querySelector("#search");
const searchResults = document.querySelector(".table-results");

let dataArray;

/**
 * Retrieves user data from a remote API and creates a user list.
 *
 * @return {Promise<void>} A promise that resolves when the user list is created.
 */
async function getUser() {
    const res = await fetch("https://randomuser.me/api/?nat=fr&results=50");
    const { results } = await res.json();
    dataArray = orderList(results)
    createUserList(dataArray)
}

getUser()

/**
 * Sorts the given list of data based on the last name and then the first name in ascending order.
 *
 * @param {Array} data - The list of data to be sorted.
 * @return {Array} The sorted list of data.
 */
function orderList(data) {
    const orderedData = data.sort((a, b) => {
        if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
            return -1;
        }
        if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    return orderedData;
}

/**
 * Iterates over a list of users and creates a list of user items in the DOM.
 *
 * @param {Array} userList - The list of users to iterate over.
 */
function createUserList(userList) {
    userList.forEach(user => {
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-item");

        listItem.innerHTML = `
            <div class="container-img">
                <img src=${user.picture.medium} alt="user1">
                <p class="name">${user.name.last} ${user.name.first}</p>
            </div>
            <p class="email">${user.email}</p>
            <p class="phone">${user.phone}</p>
        `;

        searchResults.appendChild(listItem);
    });
}

searchInput.addEventListener("input", filterData);


/**
 * Filters the data based on the searched string and updates the user list.
 *
 * @param {Event} e - The event object.
 * @return {void} This function does not return anything.
 */
function filterData(e) {

    searchResults.innerHTML = "";

    const searchedString = e.target.value.toLowerCase();

    const filteredArr = dataArray.filter(el =>
        el.name.first.toLowerCase().includes(searchedString) ||
        el.name.last.toLowerCase().includes(searchedString)
    );

    createUserList(filteredArr);
} 