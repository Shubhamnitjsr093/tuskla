const backendUrl = "https://tuskla.vercel.app";
let email = "";

const grandparentElement = document.getElementById("navbar");
try {
  const jwtToken = localStorage.getItem("jwtToken");
  console.log(jwtToken);

  if (jwtToken) {
    let parentElement=document.createElement("li");
    
    let childElement=document.createElement("a");
    childElement.innerHTML="Logout";
    childElement.setAttribute("onclick", "handleLogout()");
    parentElement.appendChild(childElement);
    grandparentElement.appendChild(parentElement);
    
    let parentElement1=getElementById("regi"), parentElement2=getElementById("logi");
    grandparentElement.removeChild(parentElement1);
    grandparentElement.removeChild(parentElement2);
  }
  else{
    let parentElement1=document.createElement("li");
    parentElement1.setAttribute("id", "regi");

    let childElement1=document.createElement("a");
    childElement1.innerHTML="Register";
    childElement1.setAttribute("href", "register.html");
    parentElement1.appendChild(childElement1);
    grandparentElement.appendChild(parentElement1);


    let parentElement2=document.createElement("li");
    parentElement2.setAttribute("id", "logi");
    
    let childElement2=document.createElement("a");
    childElement2.innerHTML="Login";
    childElement2.setAttribute("href", "login.html");
    parentElement2.appendChild(childElement2);
    grandparentElement.appendChild(parentElement2);
  }
} catch (err) {
  console.log(err);
}

async function postRegisterData(event) {
  event.preventDefault();

  const name = document.getElementsByName("name")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;
  const cpassword = document.getElementsByName("cpassword")[0].value;

  try {
    const res = await fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 422) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 409) {
      window.alert("Email already Exists");
      console.log("Email already Exists");
    } else if (res.status === 406) {
      window.alert("This UserID is not available");
      console.log("This UserID is not available");
    } else if (res.status === 400) {
      window.alert("Passwords are not matching");
      console.log("Passwords are not matching");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

async function postLoginData(event) {
  event.preventDefault();

  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;
  try {
    const res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (!data) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 422) {
      window.alert("You're missing some fields");
      console.log("You're missing some fields");
    } else if (res.status === 400) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      localStorage.setItem("jwtToken", data.token);
      window.alert("Login Successful");
      console.log("Login Successful");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

async function postContactData(event) {
  event.preventDefault();

  const name = document.getElementsByName("name")[0].value;
  const color = document.getElementsByName("color")[0].value;
  const custom = document.getElementsByName("custom")[0].value;

  if (!name || !color || !custom) {
    window.alert("You're missing some fields");
    console.log("You're missing some fields");
    return;
  }

  // getting user email
  try {
    const res = await fetch(`${backendUrl}/userdata`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken"),
      },
      credentials: "include",
    });

    const data = await res.json();
    email = data.email;
  } catch (error) {
    console.log(error);
    window.location.href = "login.html";
  }

  try {
    const res = await fetch(
      `${backendUrl}/contact?email=${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken"),
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          color,
          custom,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (data) {
      alert("Pre-Ordered Successfully");
      console.log("Order Added Successfully");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Error during Pre-Ordering:", error);
  }
}

function redirect() {
  window.location.href = "contact.html";
}

function handleLogout() {
  localStorage.removeItem("jwtToken");
  window.location.href = "index.html";
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Fetch authentication status on page load
//   fetchAuthStatus();

//   // Function to fetch authentication status
//   function fetchAuthStatus() {
//     try {
//       const jwtToken = localStorage.getItem("jwtToken");
//       const grandparentElement = document.getElementById("grandparentElement");

//       if (!jwtToken) {
//         grandparentElement.innerText = "Not Authenticated";
//       } else {
//         grandparentElement.innerText = "Authenticated";
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// });
