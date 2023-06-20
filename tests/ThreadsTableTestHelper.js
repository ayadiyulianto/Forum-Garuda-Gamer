/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadsTableHelper = {
  async addThread({
    id = "thread-123",
    title = "A thread",
      body = "A body thread",
      owner = "user-123",
      createdAt = "2023-06-18T10:39:09.123Z",
      updatedAt = "2023-06-18T10:39:09.123Z",
  }) {
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, title, body, owner, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};

module.exports = ThreadsTableHelper;
