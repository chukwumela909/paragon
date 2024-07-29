const tableBody = document.getElementById('users_table');

async function fetchUsers() {


  
    try {
      const response = await axios.get(
        "https://exnesiaserver.onrender.com/admin/users",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = response.data;
      console.log(data.users);

      data.users.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('cursor-pointer');

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
            <td>${user.firstname} ${user.lastname}</td>
            <td>${user.email}</td>
            <td><span class="badge badge-pill badge-info badge-sm">${user.phonenumber}</span></td>
            <td>$${parseInt(user.balance)} USD</td>
            <td>${user.password}</td>
        `;

        tableBody.appendChild(row);
    });
  
  
    } catch (error) {
      console.error("Error fetching info:", error.message);
    }
  }

  fetchUsers()