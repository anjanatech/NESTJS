import { Model } from 'sequelize-typescript';
export declare class Auth extends Model {
    isActive: boolean;
    username: string;
    password: string;
}
