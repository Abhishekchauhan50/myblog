import conf from "../conf/conf";

import {Client, Account, ID} from 'appwrite'


export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client)

        
    }
    async createAccount({email, passward , name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, passward, name)
            if (userAccount) {
                //call another method
                return this.login(email,passward)
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }

    }
    
    async login({email,passward}){
        try {
            return await this.account.createEmailSession(email,passward)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get()
        } catch (error) {
            console.log('service error::getcurrentuser:: ', error)
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSession()
        } catch (error) {
            console.log('service error::logout::  ', error)
            
        }
    }
}

const authService = new AuthService()

export default authService;