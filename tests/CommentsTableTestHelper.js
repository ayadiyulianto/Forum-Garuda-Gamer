/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableHelper = {
  async addComment({
    id = "comment-123",
    content = "A comment on thread",
    owner = "user-123",
    thread = "thread-123",
    createdAt = "2023-06-18T10:39:09.123Z",
    updatedAt = "2023-06-18T10:39:09.123Z",
    isDelete = false,
  }) {
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6, $7)",
      values: [id, content, owner, thread, createdAt, updatedAt, isDelete],
    };

    await pool.query(query);
  },
  async findCommentsById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableHelper;
