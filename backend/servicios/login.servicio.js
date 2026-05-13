const db= require('../db');

module.exports.registrarUser = async (obj) => {
  const sql = "INSERT INTO registrar (nombre, apellido, email, password, id_rol) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(sql, [obj.nombre, obj.apellido, obj.email, obj.password, obj.id_rol]);
  return result.insertId;
} 

module.exports.iniciarSesion = async (obj) => {
  const sql = "SELECT * FROM registrar WHERE email = ? AND password = ?";
  const [result] = await db.execute(sql, [obj.email, obj.password]);
  return result[0];
};