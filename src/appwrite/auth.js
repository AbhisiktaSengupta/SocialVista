import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client(); 
    account;
    constructor()
    {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account=new Account(this.client)    
    }
    async createAccount({email,password,name}) {
     try {
        const userAccount=await this.account.create(ID.unique(),email,password,name) //ekahne ig name ta hobenaa
        if(userAccount)
        {
            return this.login(email,password) 
        }
        else
        {
            return userAccount
        }
    
    } catch (error) {
        console.log("appwrite service :: createAccount :: error",error)
     }   
    }
    async login({email,password}){
      try {
        return await this.account.createEmailSession(email,password) //createEmailPasswordSession
      } catch (error) {  
        console.log("appwrite service ::login :: error",error)
      }  
    }
    async getCurrentUser()
    {
     try {
        return await this.account.get()
     } catch (error) {
        console.log("appwrite service :: getCurrentUser :: error",error)
     }
     return null;   
    }
    async logout()
    {
        try {
            await this.account.deleteSessions() //docs e lekha ache logout er jonno deleteSession([SESSION ID])
        } catch (error) {
            console.log("appwrite service :: logout :: error",error)
        }
    }

}
const authService=new AuthService();
export default authService;