function showLoader() {
  // document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  // document.getElementById("loader").style.display = "hidden";
}

const submit_button_bitcoin = document.getElementById("bitcoin_button");
const submit_button_usdt = document.getElementById("usdt_button")

submit_button_bitcoin.addEventListener("click", async () => {
  const buttonText = document.getElementById("button_text_bitcoin");
  var email = localStorage.getItem("userID");
  const amount = document.getElementById("bitcoin_amount");
  console.log(amount.value);

  buttonText.innerHTML = "Loading ...";

  if (amount.value == "") {
    buttonText.innerHTML = "I have made payment";
    return Swal.fire({
      title: "Missing fields",
      text: "Input fields cannot be left blank",
      icon: "",
    });
  }

  try {
    const response = await axios.post(
      "https://exnesiaserver.onrender.com/create-transaction",
      {
        amount: amount.value,
        type: "Bitcoin transfer",
        status: "pending",
        useremail: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if ((data["message"] = "success")) {
      buttonText.innerHTML = "I have made payment";
      console.log(data);
      setTimeout(function () {
        window.location.pathname = "user/dashboard.html";
      }, 2000);
      return Swal.fire({
        title: "Pending",
        text: "Transfer is under review",
        icon: "",
      });
    }
  } catch (error) {
    buttonText.innerHTML = "I have made payment";

    console.error("Error fetching info:", error.message);
  }
});

submit_button_usdt.addEventListener("click", async () => {
  const buttonText = document.getElementById("button_text_usdt");
  var email = localStorage.getItem("userID");
  const amount = document.getElementById("usdt_amount");
  console.log(amount.value);

  buttonText.innerHTML = "Loading ...";

  if (amount.value == "") {
    buttonText.innerHTML = "I have made payment";
    return Swal.fire({
      title: "Missing fields",
      text: "Input fields cannot be left blank",
      icon: "",
    });
  }

  try {
    const response = await axios.post(
      "https://exnesiaserver.onrender.com/create-transaction",
      {
        amount: amount.value,
        type: "USDT transfer",
        status: "pending",
        useremail: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if ((data["message"] = "success")) {
      buttonText.innerHTML = "I have made payment";
      console.log(data);
      setTimeout(function () {
        window.location.pathname = "user/dashboard.html";
      }, 2000);
      return Swal.fire({
        title: "Pending",
        text: "Transfer is under review",
        icon: "",
      });
    }
  } catch (error) {
    buttonText.innerHTML = "I have made payment";

    console.error("Error fetching info:", error.message);
  }
});

async function fetchData() {
  var token = localStorage.getItem("access-token");

  if (!token) {
    window.location.pathname = "/index.html";
    return;
  }
  showLoader();

  try {
    const response = await axios.post(
      "https://exnesiaserver.onrender.com/dashboard",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    const data = response.data;
    console.log(data);
    document.getElementById(
      "user_fullname"
    ).innerHTML = `${data.user[0].firstname} ${data.user[0].lastname}`;
    document.getElementById("user_email").innerHTML = `${data.user[0].email}`;
    document.getElementById("user_name").innerHTML =
      "Hi " + data.user[0].firstname + ",";
    document.getElementById(
      "main_balance"
    ).innerHTML = `$ ${data.user[0].balance}.00 USD`;

    const tag_id = document.querySelectorAll(".tag_id");
    const tag_copy = document.querySelectorAll(".tag_copy");
    const user_initials = document.querySelectorAll(".user_initials");
    tag_id.forEach((element) => {
      element.innerHTML = data.user[0].lastname;
    });
    tag_copy.forEach((element) => {
      element.setAttribute("data-clipboard-text", data.user[0].lastname);
    });
    user_initials.forEach((element) => {
      element.innerHTML = `${data.user[0].firstname[0]}${data.user[0].lastname[0]}`;
    });
  } catch (error) {
    console.error("Error fetching info:", error.message);
  }
}

fetchData();
