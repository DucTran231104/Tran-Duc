import db from '../models/index';
import CRUDservices from '../services/CRUDservices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        //findAll tim tat ca du lieu trong bang user
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from sever');
}
let displayGetCRUD = async (req, res) => { //ham nay dang la 1 promise
    let data = await CRUDservices.getAllUser();

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })

}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDservices.getUserInfoById(userId);

        //check user data not found


        // console.log("---------------------------")
        // console.log(userData)
        // console.log("---------------------------")
        return res.render('editCRUD.ejs', {
            user: userData
            // user: userData có nghĩa lấy giá trị của userData gán cho user

        })

    }
    else {
        return res.send('User is not found!!')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservices.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser,
    })

}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservices.deleteUserById(id);
        return res.send('delete the user succeed!!')
    }
    else {
        return res.send('User is not found!!')
    }
}
// object:{
// key: '',
// value: ''}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    deleteCRUD: deleteCRUD,
}


