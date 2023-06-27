const db = require("../../config/database");

const getAll = async () => {
    const [users] = await db.query("SELECT id, username, email, role FROM users");
    return users;
}

const updateOne = async (user, id) => {
    return db.query("UPDATE users SET ? WHERE id = ?", [user, id])
}

const getById = async (id) => {
    const [user] = await db.query("SELECT id, username, email, avatar, role FROM users WHERE id = ?", [id]);
    return user;
}

const insertUser = async (user) => {
    const { username, email, role, password } = user;
    const [data] = await db.query(
        "INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)", 
        [username, email, role, password]
    );
    return data;
};

const getByEmail = async (email) => {
    const [data] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return data;
}

const addTrackToFav = async (idUser, idTrack) => {
    return db.query("INSERT INTO user_tracks (id_user, id_track) VALUES (?,?)", [idUser, idTrack]);
}

module.exports = { getAll, getById, updateOne, insertUser, getByEmail, addTrackToFav };