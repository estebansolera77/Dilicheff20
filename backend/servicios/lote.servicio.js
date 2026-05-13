const db = require('../db');

module.exports.obtenerLotes = async () => {
  const sql = "SELECT * FROM lote";
  const [result] = await db.execute(sql);
  return result;
};

module.exports.registrarLote = async (obj) => {
  const sql = "INSERT INTO lote (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [obj.nombre, obj.descripcion, obj.fecha_creacion]);
  return result.insertId;
};

module.exports.actualizarLote = async (obj) => {
  const sql = "UPDATE lote SET nombre=?, descripcion=?, fecha_creacion=? WHERE id_lote=?";
  const [result] = await db.execute(sql, [obj.nombre, obj.descripcion, obj.fecha_creacion, obj.id_lote]);
  return result;
};