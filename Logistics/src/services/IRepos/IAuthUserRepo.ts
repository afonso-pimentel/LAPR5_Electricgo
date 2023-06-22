import IAuthUserDTO from "../../dto/IAuthUserDTO";

export default interface IAuthUserRepo{
    validateUser(googleId: string, email: string):Promise<IAuthUserDTO>;
}