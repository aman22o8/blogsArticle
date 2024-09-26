import { Client,Databases,ID,Query,Storage } from "appwrite";
import config from "../config/config";


export  class Service{
    client=new Client();
        databases;
        bucket;
        constructor(){
            this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
            this.databases=new Databases(this.client);
            this.bucket=new Storage(this.client);

        }

        async createPost({title,slug,content,featuredImage,status,userId}){
            try {
                // const document=
                return await this.databases.createDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )

                // return document
                
            } catch (error) {
                throw error
            }
        }

        async updatePost (slug,{title,content,featuredImage,status}){
            try {
                const updateDocument=await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{title,content,featuredImage,status})
                return updateDocument
            } catch (error) {
                throw error
            }
           
        }

        async deletePost(slug){
            try {
                
                 await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
                 return true
            } catch (error) {
                console.log("APP WRITE SERVICE :: DELETE POST  ERRORS",error);
                return false
            }
        }
        async getPost(slug){
            try {
                
                const result= await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
                return result
                
            } catch (error) {
                console.log("APP WRITE SERVICE :: DELETE POST  ERRORS",error);
                return false
            }
        }

        async getPosts(queries=[Query.equal('status',['active'])]){
            try {
                const result=await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries)
                return result
                
            } catch (error) {
                console.log("APP WRITE SERVICE :: GET ALL POSTs  ERRORS",error)
                return false
                
            }
        }

        //file upload services
        async uploadFile(file){
            try {
               return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
                
            } catch (error) {
                console.log("APP WRITE SERVICE :: UPLOAD FILE  ERRORS",error)
                return false
            }
        }
        async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(config.appwriteBucketId,fileId)
                return true
                
            } catch (error) {
                console.log("APP WRITE SERVICE :: UPLOAD FILE  ERRORS",error)
                return false
            }
        }
        getFilePreview(fileId){
            
                // console.log("back fileID",fileId)
                
                return this.bucket.getFilePreview(config.appwriteBucketId,fileId)
               

           
              //it return a url
                
            
        }






};

const service=new Service()
export default service