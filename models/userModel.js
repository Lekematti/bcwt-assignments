'use strict';

const pool = require("../database/db");
const promisePool = pool.promise();


//TODO: update the sql queries to user not cat and some values.
const getAllUsers = async () => {
  try {
    const sql = `SELECT user_id, name, email FROM wop_user`;
    const [rows] = await promisePool.query(sql);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getUserById = async (id) => {
  try {
    const sql = `SELECT wop_cat.*, wop_user.name AS username 
                 FROM wop_cat LEFT JOIN  wop_user ON wop_cat.owner = wop_user.user_id 
                 WHERE cat_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
}

const insertUser = async (user) => {
  try {
    const sql = `INSERT INTO wop_cat VALUES (?,?)`;
    const [rows] = await promisePool.query(sql, [
      null,
      user.name,

      ]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
}

const modifyUser = async (user) => {
  try {
    const sql = `UPDATE wop_user SET name=?
                 WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [
      user.name,
      user.
      user.id]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql update user failed');
  }
}

const deleteUser = async (id) => {
  try {
    const sql = `DELETE FROM wop_user WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [id]);
    //console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql delete user failed');
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  modifyUser,
  deleteUser,
};
