import { injectable } from "inversify";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "../components/SideBar/SidebarData";
import { UserToken } from "../dtos/User/UserToken";
import { IAuthService } from "../services/IAuthService";

@injectable()
export class AuthService implements IAuthService {

    login(): void {
        window.location.href = process.env.REACT_APP_LOGISTICS_API_URL + "/auth/google";
    }
    logout(): void {
        localStorage.removeItem('user');
        window.location.href = process.env.REACT_APP_UI_HOME_URL ?? window.location.origin;
    }
    getUser(): UserToken {
       return JSON.parse(localStorage.getItem('user') ?? '') as UserToken;
    }
    userAuthenticated(): boolean {
        if(localStorage.getItem('user') == null){
            return false;
        }
        var user = this.getUser();
        if(user == null){
            return false;
        }

        if(user.expireDate < new Date()){
            localStorage.removeItem('user');
            return false;
        }
        return true;
    }
    setLoginUser(user: string): UserToken {
        var userToken = JSON.parse(decodeURI(user)) as UserToken;

        localStorage.setItem('user', JSON.stringify(userToken));
        return userToken;
    }

    getToken(): string {
        return "Bearer " + this.getUser().token;
    }

    validateResourceAccess(resource: string, redirect: boolean = true): void {
        var roles = SidebarData.find((item) => item.title == resource)?.roles;

        if(!this.userAuthenticated()){
            if(!roles?.includes(0)){
                this.logout();
            }
            return;
        }

        if(roles == null){
            window.location.href = process.env.REACT_APP_UI_HOME_URL ?? window.location.origin;
            return;
        }

        if(!roles.includes(this.getUser().role)){
            window.location.href = process.env.REACT_APP_UI_HOME_URL ?? window.location.origin;
            return;
        }

    }

}