
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const user_name = document.getElementById("user_name").value;
  const user_last = document.getElementById("user_last").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  //const age = document.getElementById("age").value;

  try {
    const response = await fetch("http://localhost:8080/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: user_name,
        last_name: user_last,
        user: email,  // si el campo "user" representa el email
        password
      })
    });

    const data = await response.json();

    const msg = document.getElementById("responseMsg");
    if (data.ok) {
      msg.textContent = data.message;
      msg.style.color = "green";
      setTimeout(() => {
        window.location.href = "../";
      }, 2000)
    } else {
      msg.textContent = data.message;
      msg.style.color = "red";
    }
  } catch (error) {
    console.error("Error en la petición:", error);
    document.getElementById("responseMsg").textContent = "Error de conexión con el servidor.";
  }
}); 