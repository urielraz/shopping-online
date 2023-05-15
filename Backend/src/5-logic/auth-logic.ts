import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { ResourceNotFoundErrorModel, UnauthorizedError, ValidationErrorModel } from "../4-models/error-models";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";

async function register(user: UserModel): Promise<string> {
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);
    if (await isIDTaken(user.id)) throw new ValidationErrorModel(`ID ${user.id} already taken`);

    user.password = cyber.hash(user.password);
    
    const sql = `INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, DEFAULT)`;
    
    const info:OkPacket = await dal.execute(sql, [user.id ,user.firstName,user.lastName,user.username, user.password, user.city, user.street]);
    // await dal.execute(sql, [user.id ,user.firstName,user.lastName,user.username, user.password, user.city, user.street]);
    user.role = RoleModel.User;
    
    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);
    console.log(credentials.password)

    credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    // console.log(credentials.password)

    if (users.length === 0) throw new UnauthorizedError("Incorrect username or password");

    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

async function isIDTaken(id: number): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE id = ?`;
    const count = await dal.execute(sql,[id]);
    console.log(count[0].count);
    
    return count[0].count > 0;
}

// async function getOneUser(id: number): Promise<UserModel> {
//     const sql = `SELECT * FROM users WHERE id = ?`;
//     const users = await dal.execute(sql, [id]);
//     if (users.length === 0) throw new ResourceNotFoundErrorModel(id);
//     const user = users[0];
//     return user;
// }

// async function updateUser(user: UserModel): Promise<UserModel> {

//     if (await isUsernameTaken(user.username)) throw new ValidationErrorModel(`Username ${user.username} already taken`);

//     const sql = `
//         UPDATE users SET
//             firstName = ?,
//             lastName = ?,
//             username = ?
//         WHERE id = ?`;
//     const info: OkPacket = await dal.execute(sql,[user.firstName, user.lastName, user.username, user.id]);
//     if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(user.id);
//     return user;
// }

export default {
    register,
    login,
    // getOneUser,
    // updateUser
}