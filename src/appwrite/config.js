import conf from "../conf/conf.js";
import { Client, Databases,ID,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor()
    {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId )
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client) 
    }
    async createPost({title,slug,content,featuredImage,status,userId})
    {
     try {
        return await this.databases.createDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug,{
            title,
            content,
            featuredImage,
            status,
            userId
        })
     } catch (error) {
        console.log("Appwrite service:: createPost :: error",error)
     }   
    }
    async updatePost(slug,{title,content,featuredImage,status})
    {
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error)
        }         
    }
    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log("appwrite service :: deletePost :: error",error)
            return false
        }         
    }
    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug)
        } catch (error) {
            console.log("appwrite service :: getPost :: error",error)
        }
    }
    async getPosts(queries=[Query.equal("status","active")])
    {
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseId,conf.appWriteCollectionId,queries)
        } catch (error) {
            console.log("appwrite service :: getAllPost :: error",error)
            throw(error)
        }
    }
    
    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appWriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error",error)
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appWriteBucketId,fileId)
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error",error)
            return false;
        }
    }
    async getFilePreview(fileId)
    {
        try {
            return await this.bucket.getFilePreview(conf.appWriteBucketId,fileId)
        } catch (error) {
            console.log("appwrite service :: getFilePreview :: error",error)
            return false;
        }
    }
    
}

const service=new Service()
export default service