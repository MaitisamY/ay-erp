import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import generalSettingRoutes from './router/generalSettingRoute.js';
import categoryRoutes from './router/categorySettingRoute.js';
import uomRoutes from './router/uomSettingRoute.js';
import taxRoutes from './router/taxSettingRoute.js';
import brandRoutes from './router/brandSettingRoute.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', categoryRoutes);
app.use('/', uomRoutes);
app.use('/', generalSettingRoutes);
app.use('/', taxRoutes);
app.use('/', brandRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
