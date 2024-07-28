function showLoader() {
  // document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  // document.getElementById("loader").style.display = "hidden";
}

const submit_button_bitcoin = document.getElementById("bitcoin_button");
const submit_button_usdt = document.getElementById("usdt_button");

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
    console.log(data.transactions);

    document.getElementById("user_fullname").innerHTML = `${data.user[0].firstname} ${data.user[0].lastname}`;
    document.getElementById("user_email").innerHTML = `${data.user[0].email}`;
    document.getElementById("user_name").innerHTML = "Hi " + data.user[0].firstname + ",";  
    document.getElementById("main_balance").innerHTML = `$ ${data.user[0].balance}.00 USD`;
    const transaction_container = document.getElementById('transaction_details');

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

    if (data.transactions.length === 0) {
        transaction_container.innerHTML = `
      
            <div class="text-center mt-20">
                <img
                    src="https://paragon-bankltd.com/public/asset/images/transactions.png"
                    style="height: auto; max-width: 150px"
                    class="mb-6"
                />
                <h3 class="text-dark">No Recent Transactions</h3>
                <p class="text-dark">
                    We couldn't find any transactions to this account
                </p>
            </div>
       `;
    } else {
        transaction_container.innerHTML = `
        
                    <h4 class="mb-4">Recent Transactions</h4>
                        ${data.transactions.map(transaction => `
                        <div class="col-lg-12 col-md-12 mb-6">
                            <div class="d-flex flex-stack cursor-pointer">
                                <div class="d-flex align-items-center">
                                    <div class="symbol symbol-40px symbol-circle me-5">
                                        <div class="symbol-label fs-3 fw-bolder text-info bg-light-info">
                                            <svg
                                                class="svg-inline--fa fa-plus"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fal"
                                                data-icon="plus"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                data-fa-i2svg=""
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M432 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z"
                                                ></path></svg
                                            >
                                        </div>
                                    </div>
                                    <div class="ps-1">
                                        <p class="fs-6 text-dark text-hover-primary fw-bolder mb-0">
                                            $${transaction.amount} USD
                                        </p>
                                        <p class="fs-6 text-gray-800 text-hover-primary mb-0">
                                            ${transaction.type}
                                        </p>
                                    </div>
                                </div>
                                <div class="ps-1 text-end">
                                    <p class="fs-6 text-dark mb-0">${new Date(transaction.created).toLocaleString()}</p>
                                    <p class="fs-6 text-gray-800 text-hover-primary mb-0">
                                        <span class="badge badge-pill badge-info badge-sm">${transaction.status}</span>
                                    </p>
                                </div>
                            </div>
                            <hr class="bg-light-border" />
                        </div>
                    `).join('')}
                 
        `
    }

  } catch (error) {
    console.error("Error fetching info:", error.message);
  }
}

fetchData();
