import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    try {

        let data = await db.User.findAll();
        res.render('homepage.ejs', { data: JSON.stringify(data) });

    }
    catch (e) {
        console.log(e);
    }
};

let getCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('display.ejs', { dataTable: data });
}

let CRUD = async (req, res) => {
    return res.render('crud.ejs');
}


let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    let data = await CRUDService.getAllUser();
    return res.render('display.ejs', { dataTable: data });
};

let getEditCRUD = async (req, res) => {
    let userId = req.params.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', { user: userData });
    }
    else {
        return res.send('User not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('display.ejs', { dataTable: allUsers });
}

let deleteCRUD = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!userId) {
            return res.status(400).send("Missing user id");
        }

        let result = await CRUDService.deleteUser(userId);

        if (!result.success) {
            return res.status(404).send(result.message);
        }

        return res.redirect('/get-crud');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    CRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};