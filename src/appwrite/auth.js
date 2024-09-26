import { Client, Account, ID } from "appwrite";
import config from '../config/config';


export class AuthService{
            client=new Client;
            account;

            constructor(){
                this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
                this.account=new Account(this.client)
            }

            async createAccount({email,password,name}){
                    try {
                        const userAccount=await this.account.create(ID.unique(),email,password,name)
                        if (userAccount) {
                            //return to direct login by calling another method
                            return this.logIn({ email, password })

                        } else {
                            return userAccount;
                        }
                    } catch (error) {
                        throw error;
                    }

            }
            async logIn({email,password}){
                    try {
                        const loggedIn= await this.account.createEmailPasswordSession(email,password)
                        return loggedIn
                    } catch (error) {
                        throw error
                    }
            }

            async getCurrentUser(){
                try {
                    const account=await this.account.get()
                    return account
                } catch (error) {
                    throw error
                }
                
                return null

            }
            async logOut(){
                try {
                    const result =await this.account.deleteSessions()
                    return result
                    
                } catch (error) {
                    throw error
                }
            }


}

const authService = new AuthService()
console.log(authService)

export default authService