const express = require("express");
const mongoose = require('mongoose');

const UserRoutes = require ('./App/Routers/UserRoutes');
const LogRoutes = require ('./App/Routers/logRoutes');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',UserRoutes);
app.use('/api',LogRoutes);

mongoose.connect('mongodb+srv://auditech23:Nd5AQ66Ds40tKJRH@auditechcluster.tupfsuo.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Running on port 3000!');
    });
}).catch((err) => {
    console.log(err);
});