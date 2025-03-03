import express from "express"
import homecontroller from "../controller/homecontroller";

let router = express.Router();

let initWebRoutes = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send("Tran Thai Trong Duc")
    // });
    router.get('/Tranduc', (req, res) => {
        return res.send("Tranduc23112004")
    });
    router.get('/about', homecontroller.getAboutPage);
    router.get('/', homecontroller.getHomePage);
    router.get('/crud', homecontroller.getCRUD);

    router.post('/post-crud', homecontroller.postCRUD);
    router.get('/get-crud', homecontroller.displayGetCRUD);
    router.get('/edit-crud', homecontroller.getEditCRUD);
    router.post('/put-crud', homecontroller.putCRUD);
    router.get('/delete-crud', homecontroller.deleteCRUD)
    //rest api
    // mo hinh MVC: module->view->controller
    return app.use("/", router);
}

module.exports = initWebRoutes;