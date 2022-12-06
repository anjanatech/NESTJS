import { JwtPayload } from './dto/Jwt-payload-Interface';
import { Strategy } from 'passport-jwt';
declare const Jwtstartegy_base: new (...args: any[]) => Strategy;
export declare class Jwtstartegy extends Jwtstartegy_base {
    private userModel;
    constructor(userModel: any);
    validate(payload: JwtPayload): {};
}
export {};
