import db from '../models/index';
let getHomePage = async (req, res) => {
    try {

        let data = await db.User.findAll();
        res.render('homepage.ejs', { data });

    }
    catch (e) {
        console.log(e);
    }
};

module.exports = {
    getHomePage
};