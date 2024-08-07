// Inventory type
/*
    ownedBy INT NOT NULL,
    itemId INT NOT NULL,
    itemName
    amount INT NOT NULL,
    marketInfo_onMarket BOOLEAN,
    marketInfo_price DOUBLE NOT NULL,
    FOREIGN KEY (itemId) REFERENCES items(id),
    FOREIGN KEY (ownedBy) REFERENCES users(id)
*/

const { getAllRows, getRowById, updateRowById, deleteRowById, clearTable } = require("../../database/queries");
const db = require('../../database/connection');

const TABLE_NAME = 'inventories';

const createInventory = async (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const cols = keys.map(key => `${key}`).join(', ');
  const sql = `INSERT INTO ${TABLE_NAME} (${cols}) VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    const [rows] = await db.execute(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};
const getInventories = async () => await getAllRows(TABLE_NAME);

const getInventoryById = async (id) => {
  const sql = `SELECT * FROM ${TABLE_NAME} WHERE ownedBy = ${id}`;

  try {
    const [rows] = await db.query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getItemsInInventory = async (id) => {
  const sql = `
    SELECT ownedBy, itemId, itemName, amount, marketInfo_onMarket, marketInfo_price, tradeValue, rarity_name, rarity_chance 
    FROM inventories inv JOIN items item ON inv.itemId = item.id
    WHERE ownedBy != ${id};
  `;

  try {
    const [rows] = await db.query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
}

const updateInventoryById = async (id, obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const cols = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE ${TABLE_NAME} SET ${cols} WHERE ownedBy = ${id}`;
  
  try {
    const [rows] = await db.execute(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteInventoryById =  async (id) => await deleteRowById(TABLE_NAME, id);

const getLatestInventoryId = async () => {
  const sql = `SELECT MAX(ownedBy) FROM ${TABLE_NAME}`;
  try {
    const [rows] = await db.query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
}

const clearInventoryTable = async () => await clearTable(TABLE_NAME);

module.exports = {
  createInventory,
  getInventories,
  getInventoryById,
  getItemsInInventory,
  updateInventoryById,
  deleteInventoryById,
  getLatestInventoryId,
  clearInventoryTable
}