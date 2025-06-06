
document.getElementById("Form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
    alert("Se ha enviado un correo a " + email + " con las instrucciones para recuperar tu contraseña.");
  try {
    const response = await fetch("http://localhost:8080/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: email,
      })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
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