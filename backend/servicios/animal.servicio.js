const db = require('../db');

module.exports.obtenerAnimales = async() => {
    const sql = "SELECT * FROM animal";
    const [result] = await db.execute(sql);
    return result;
};

module.exports.registrarAnimal = async(obj) =>{
    const sql = "INSERT INTO animal (codigo, tipo, raza, sexo, fecha_nacimiento, peso, id_lote, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute (sql, [obj.codigo, obj.tipo, obj.raza, obj.sexo, obj.fecha_nacimiento, obj.peso, obj.id_lote, 'ACTIVO']);
    return result.insertId;
};


module.exports.actualizarAnimal = async (obj) => {
  const sql = "UPDATE animal SET codigo=?, tipo=?, raza=?, sexo=?, fecha_nacimiento=?, peso=?, id_lote=?, estado=? WHERE id_animal=?";
  const [result] = await db.execute(sql, [obj.codigo, obj.tipo, obj.raza, obj.sexo, obj.fecha_nacimiento, obj.peso, obj.id_lote, obj.estado, obj.id_animal]);
  return result;
};

module.exports.deshabilitarAnimal = async (id, estado) => {
  const sql = "UPDATE animal SET estado=? WHERE id_animal=?";
  const [result] = await db.execute(sql, [estado, id]);
  return result;
};

module.exports.obtenerAnimalesPorLote = async (id_lote) => {
  const sql = "SELECT * FROM animal WHERE id_lote = ?";
  const [result] = await db.execute(sql, [id_lote]);
  return result;
};