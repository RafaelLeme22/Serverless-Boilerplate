const db = require("./src/database/index");
afterAll(() => {
    db.close();
});
