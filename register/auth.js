function register() {
  const btn_state = document.getElementById("btnState");
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const phonenumber = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  // showLoader()
  btn_state.innerHTML = "Loading...";
  // Validate input (add your validation logic here)
  if (
    firstname == "" ||
    lastname == "" ||
    email == "" ||
    phonenumber == "" ||
    password == ""
  ) {
    // hideLoader()
    btn_state.innerHTML = "Submit";

    return Swal.fire({
      title: "Missing fields",
      text: "Input fields cannot be left blank",
      icon: "question",
    });
  }

  if (email.includes("@") == false) {
    // hideLoader()
    btn_state.innerHTML = "Submit";

    return Swal.fire({
      title: "Incorrect",
      text: "Use a valid email",
      icon: "question",
    });
  }

  // Create data object to send in the request
  const data = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phonenumber: phonenumber,
    password: password,
  };

  // Send registration request to the server using Axios
  axios
    .post("http://localhost:1200/auth/register", data)
    .then((response) => {
      // Handle successful registration response
      console.log(response);
      if (response.data["error"] == true) {
        // hideLoader()
        btn_state.innerHTML = "Submit";

        return Swal.fire({
          title: "Error",
          text: response.data["message"],

          icon: "error",
        });
      }
      // Optionally redirect to another page
      Swal.fire({
        title: "Success",
        text: "Registered",
        icon: "success",
      });
      // hideLoader()
      setTimeout(function () {
        window.location.pathname = "../login.html";
      }, 2000);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    })
    .finally(() => {
      // Hide the loader when the request is complete (success or failure)
    });
}

async function login() {
  // Get input values
  const btn_state = document.getElementById("btnState");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // showLoader()
  btn_state.innerHTML = "Signing In...";

  // Validate input (add your validation logic here)
  if (email == "" || password == "") {
    // hideLoader()
    btn_state.innerHTML = "Sign In";

    return Swal.fire({
      title: "Missing fields",
      text: "Input fields cannot be left blank",
      icon: "question",
    });
  }

  if (email.includes("@") == false) {
    btn_state.innerHTML = "Sign In";


    return Swal.fire({
      title: "Incorrect",
      text: "Use a valid email",
      icon: "question",
    });
  }

  // Create data object to send in the request
  const data = {
    email: email,
    password: password,
  };

  //    await addDeviceInfo(email)

  // Send registration request to the server using Axios
  axios
    .post("http://localhost:1200/auth/login", data)
    .then((response) => {
      // Handle successful registration response
      console.log(response);
      if (response.data["error"] == true) {
        btn_state.innerHTML = "Sign In";

        return Swal.fire({
          title: "Error",
          text: response.data["message"],
          icon: "error",
        });
      }

      // store token in local storage
      localStorage.setItem("access-token", response.data["message"]);

      // Optionally redirect to another page
      setTimeout(function () {
        window.location.pathname = "user/index.html";
      }, 2000);
    })
    .catch((error) => {
        btn_state.innerHTML = "Sign In";
      return Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    })
    .finally(() => {
      // Hide the loader when the request is complete (success or failure)
    });
}
