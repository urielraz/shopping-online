import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public city: string;
    public street: string;
    public role: RoleModel;


    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.city = user.city;
        this.street = user.street;
        this.role = user.role;

    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().optional().min(4).max(30),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().optional().min(2).max(20),
        role: Joi.forbidden()

    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;