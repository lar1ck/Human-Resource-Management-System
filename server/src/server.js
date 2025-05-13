require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/departments", require("./routes/department.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/recruitments", require("./routes/recruitment.routes"));
app.use("/api/staff", require("./routes/staff.routes"));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port https://localhost:${process.env.PORT}`);
});
