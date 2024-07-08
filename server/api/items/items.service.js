// Item type
/*
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    tradeValue INT NOT NULL,
    rarity_name VARCHAR(20) NOT NULL,
    rarity_chance DOUBLE NOT NULL
*/

const { getAllRows, getRowById, updateRowById, deleteRowById, clearTable, getRandomRows } = require("../../database/queries");
const db = require('../../database/connection');

const TABLE_NAME = 'items';

const createItem = async (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const cols = keys.map(key => `${key}`).join(', ');
  const sql = `INSERT INTO ${TABLE_NAME} (${cols}) VALUES (?, ?, ?, ?, ?)`;
  try {
    const [rows] = await db.execute(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};
const getItems = async () => await getAllRows(TABLE_NAME);

const getItemById = async (id) => await getRowById(TABLE_NAME, id);

const getRandomItems = async (limit) => await getRandomRows(TABLE_NAME, limit)

const updateItemById = async (id, obj) => await updateRowById(TABLE_NAME, id, obj);

const deleteItemById =  async (id) => await deleteRowById(TABLE_NAME, id);

const clearItemTable = async () => await clearTable(TABLE_NAME);

module.exports = {
  createItem,
  getItems,
  getItemById,
  getRandomItems,
  updateItemById,
  deleteItemById,
  clearItemTable
}