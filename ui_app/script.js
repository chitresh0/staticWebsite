// Register User
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    if (user && pass) {
        localStorage.setItem(user, pass);
        alert("Registration successful!");
        window.location.href = "index.html";
    } else {
        alert("Please fill all fields!");
    }
}

// Login User
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (localStorage.getItem(user) === pass) {
        sessionStorage.setItem("loggedInUser", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials!");
    }
}

// Logout
function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Display Logged-in User
document.addEventListener("DOMContentLoaded", function () {
    let user = sessionStorage.getItem("loggedInUser");
    if (document.getElementById("username")) {
        if (!user) {
            window.location.href = "index.html";
        } else {
            document.getElementById("username").textContent = user;
            loadData();
        }
    }
});

// Add Data
function addData() {
    let input = document.getElementById("dataInput").value;
    if (!input) return alert("Enter some data!");
    
    let data = JSON.parse(localStorage.getItem("dataList")) || [];
    data.push(input);
    localStorage.setItem("dataList", JSON.stringify(data));

    document.getElementById("dataInput").value = "";
    loadData();
}

// Load Data
function loadData() {
    let data = JSON.parse(localStorage.getItem("dataList")) || [];
    let list = document.getElementById("dataList");
    list.innerHTML = "";

    data.forEach((item, index) => {
        list.innerHTML += `<li>${item} 
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </li>`;
    });
}

// Delete Data
function deleteData(index) {
    let data = JSON.parse(localStorage.getItem("dataList")) || [];
    data.splice(index, 1);
    localStorage.setItem("dataList", JSON.stringify(data));
    loadData();
}

// Edit Data
function editData(index) {
    let newData = prompt("Enter new data:");
    if (newData) {
        let data = JSON.parse(localStorage.getItem("dataList")) || [];
        data[index] = newData;
        localStorage.setItem("dataList", JSON.stringify(data));
        loadData();
    }
}

// Search Data
function searchData() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll("#dataList li");

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "flex" : "none";
    });
}
