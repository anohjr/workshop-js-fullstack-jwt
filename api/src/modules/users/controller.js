const { getAll, getById, updateOne, insertUser, getByEmail, addTrackToFav, updateOneByMail } = require("./model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {sendResetPasswordMail} = require("../../helpers/mailer.js");

const findAll = async (req, res, next) => {
    console.log(req.idUser, req.roleUser);
    try {
        const users = await getAll();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const [user] = await getById(req.idUser);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json("a error occured during the upload");

        const uploadedFilePath = req.protocol + "://" + req.get("host") + "/upload/" + req.file.filename;

        const result = await updateOne({avatar: uploadedFilePath}, req.idUser);
        res.status(200).json({avatar: uploadedFilePath});
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username, email, role } = req.body;

        const [user] = await getByEmail(req.body.email);
        if (user) return res.status(400).json("email already exists");

        req.body.password = await argon.hash(req.body.password);
        const result = await insertUser(req.body);
        res.status(201).json({ id: result.insertId, username, email, role });
    } catch (err) {
        next(err);
    }
};

const createFavTrack = async (req, res, next) => {
    try {
        const {idTrack} = req.params;
        await addTrackToFav(req.idUser, idTrack);
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

const login = async (req, res , next) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json("Please specify both email and password");

    try {
        const [user] = await getByEmail(email);
        if (!user) return res.status(400).json("Invalid email");
        console.log(user, password);
        if (await argon.verify(user.password, password)) {
            const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_AUTH_SECRET, {expiresIn: "1h"});
            res.cookie("access_token", token, {httpOnly: true, secure: process.env.NODE_ENV == "production"});
            res.status(200).json({email, id: user.id, role: user.role, avatar: user.avatar});
        } 
        else
            res.status(400).json("invalid password");
    } catch (err) {
        next(err);
    }

}

const logout = ({res}) => {
    res.clearCookie("access_token").sendStatus(200);
}

const sendResetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const resetToken = jwt.sign({ email }, process.env.JWT_AUTH_SECRET);
        const url = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;
        await sendResetPasswordMail({ dest: email, url });
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }

}

const resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        const hash = await argon.hash(password);
        await updateOneByMail({password: hash}, decoded.email);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


module.exports = { findAll, getCurrentUser, updateAvatar, createUser, createFavTrack, login, logout, sendResetPassword, resetPassword };