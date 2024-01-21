const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("login handler");
  const email = document.querySelector("#emailr-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
      return;
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log(username, password, password2);

  if (password !== password2) {
    alert("Passwords must match");
    return;
  }

  if (username && password && password2) {
    console.log("making fetch req");
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Problem with making a new account");
    }
  }
};

console.log("over here");

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
