function showLoader(){
    // document.getElementById("loader").style.display = "block";
}

function hideLoader(){
    // document.getElementById("loader").style.display = "hidden";
}



async function fetchData() {
    var token =  localStorage.getItem("access-token");

    if (!token) {
        window.location.pathname = "/index.html";
        return
    }
    showLoader()
   

    try {
        const response = await axios.post('https://exnesiaserver.onrender.com/dashboard',
            {

            }, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
                
            }
        },);

        const data = response.data;
        console.log(data.user[0])
        document.getElementById("user_fullname").innerHTML = `${data.user[0].firstname} ${data.user[0].lastname}`
        document.getElementById("user_email").innerHTML = `${data.user[0].email}`
        document.getElementById("user_name").innerHTML = "Hi " + data.user[0].firstname + ","
        document.getElementById("main_balance").innerHTML = `$ ${data.user[0].balance}.00 USD`

        const tag_id = document.querySelectorAll(".tag_id")
        const tag_copy = document.querySelectorAll(".tag_copy")
        const user_initials =   document.querySelectorAll(".user_initials")
        tag_id.forEach(element => {
            element.innerHTML = data.user[0].lastname
        })
        tag_copy.forEach(element => {
            element.setAttribute('data-clipboard-text', data.user[0].lastname);
        })
        user_initials.forEach(element => {
           element.innerHTML =  `${data.user[0].firstname[0]}${data.user[0].lastname[0]}`
        })
      

    } catch (error) {
        console.error('Error fetching info:', error.message);
    }
}
fetchData()