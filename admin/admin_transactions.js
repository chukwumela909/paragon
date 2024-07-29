const tableBody = document.getElementById("transactions_table");

const statusBtn = document.getElementById("status_btn");

// statusBtn.addEventListener("click", async () => {
//     Swal.fire({
//       title: "Do you want to save the changes?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Saved!", "", "success");
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   });

async function validateTransaction(status, referenceID, amount, email) {
  try {
    const response = await axios.post(
      "http://localhost:1200/update_transaction",
      {
        status: status,
        referenceID: referenceID,
        amount: amount,
        useremail: email
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchTransactions() {
  //   var token = localStorage.getItem("access-token");

  //   if (!token) {
  //     window.location.pathname = "/index.html";
  //     return;
  //   }

  try {
    const response = await axios.get(
      "https://exnesiaserver.onrender.com/transactions",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log(data.transactions);

    data.transactions.forEach((transaction) => {
      const row = document.createElement("tr");
      row.classList.add("cursor-pointer");

      row.innerHTML = `
            <td>
                <div class="symbol symbol-40px symbol-circle me-5">
                    <div class="symbol-label fs-3 fw-bolder text-info bg-light-info">
                        <svg class="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M432 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z"></path>
                        </svg>
                    </div>
                </div>
            </td>
            <td>$ ${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><span class="badge badge-pill ${
              transaction.status == "completed"
                ? "badge-success"
                : transaction.status == "pending"
                ? "badge-warning"
                : "badge-danger"
            } badge-sm"  id="status_btn"  data-id="${
        transaction.referenceID
      }">${transaction.status}</span></td>
            <td>${transaction.referenceID}</td>
       
        `;

      row.addEventListener("click", (event) => {
        const details = event.target.closest("tr");
        const referenceID = details.querySelector("[data-id]").dataset.id;
        Swal.fire({
          title: "Do you want approved transaction?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Approve",
          denyButtonText: `Deny`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            validateTransaction("completed", referenceID, transaction.amount, transaction.useremail);
            Swal.fire("completed!", "");
          } else if (result.isDenied) {
            validateTransaction("failed", referenceID, transaction.amount, transaction.useremail);

            Swal.fire("failed", "");
          }
        });
        console.log(referenceID);
      });

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching info:", error.message);
  }
}

fetchTransactions();
