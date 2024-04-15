import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoryRoutes from './router/categoryRoutes.js';
import uomRoutes from './router/uomRoutes.js';
import generalSettingRoute from './router/generalSettingRoute.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', categoryRoutes);
app.use('/', uomRoutes);
app.use('/', generalSettingRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
