import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../4-models/user-model";
import crypto from "crypto"
import RoleModel from "../4-models/role-model";

const jwtSecretKey = "urielRazWebsite";

function getNewToken(user: UserModel): string {

    delete user.password;

    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }

            const token = header.substring(7);

            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

async function verifyAdmin(request: Request): Promise<boolean> {

    // Check if user is logged in 
    const isLoggedIn = await verifyToken(request);
    if (!isLoggedIn) return false;

    // Extract Token from Header from request
    const header = request.header('authorization');
    const token = header.substring(7);

    // Extract container from token
    const container: any = jwt.decode(token);

    // Extract user from Container
    const user: UserModel = container.user;

    // Return true if is admin and false if not
    return user.role === RoleModel.Admin
}


const salt = 'thisIsTheSaltToWebsite';

function hash( plainText: string): string{

    if(!plainText ) return null;

    // Hash with salt 
    const hashedText = crypto.createHmac('sha512', salt ).update(plainText).digest('hex');
    
    // Hash without salt 
    //const hashedText = crypto.createHash('sha512').update(plainText).digest('hex');

    return hashedText;

}



export default {
    getNewToken,
    verifyToken,
    hash,
    verifyAdmin
};
