import conf from "../conf/conf";

import {Client,ID , Databases, Storage, Query} from 'appwrite'

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        
    }
    async createPost ({title, slug, content, featuredimage,status, userId }){
        try {
            return await this.databases.createDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                //considering it document is↙
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log('servie error:: createpst::', error)
            
        }

    }
    async updatePost (slug,{title, content, featuredimage,status, userId }){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                //considering it document is↙
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    
                }
            )
            
        } catch (error) {
            console.log('servie error:: updatepost::', error)
            
        }

    }
    async deletePost (slug){
        try {
            return await this.databases.deleteDocumentDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                //considering it document is↙
                slug
            )
            return true
                
            
        } catch (error) {
            console.log('servie error:: deletepost::', error)
            return false
            
        }

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('service error:: getpost::', error)
            
        }
    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.getPosts(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('service error:: getposts::', error);
            
        }
    }
    async uploadFile(){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                File
            )
        } catch (error) {
            console.log('service error:: uploadfile:',error);
            return false            
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId

            )
            return true

        } catch (error) {
            console.log('service error:: deletefile',error);
            return false
            
        }
    }
    getFilePrewiew(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }



}

const service = new Service()

export default service