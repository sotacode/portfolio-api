module.exports.htmlToSend = (name, email, message) => {
  return `
    <h1>Información de contacto</h1>
    <ul>
      <li>Nombre: ${name}</li>
      <li>Email: ${email}</li>
    </ul>
    <p>${message}</p>
  `;
}