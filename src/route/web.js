import express from "express";
import homeControllers from "../controllers/homeControllers";

let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', homeControllers.getHomePage);

    // CRUD
    router.get('/CRUD', homeControllers.CRUD);
    router.post('/post-crud', homeControllers.postCRUD);
    router.get('/get-crud', homeControllers.getCRUD);

    // Edit & Update
    router.get('/edit-crud/:id', homeControllers.getEditCRUD);
    router.post('/put-crud', homeControllers.putCRUD);

    // Delete
    router.get('/delete-crud/:id', homeControllers.deleteCRUD);

    return app.use('/', router);
}

module.exports = initWebRoute;
