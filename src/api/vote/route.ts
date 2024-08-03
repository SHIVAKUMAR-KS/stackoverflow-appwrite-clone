import { db, voteCollection } from "@/models/name"
import { databases } from "@/models/server/config"
import {NextRequest, NextResponse} from "next/server"
import { Query } from "node-appwrite"

export async function POST(request : NextRequest){
    try {
        // grab the data
        const {voteById,voteStatus,type,typeId} =await request.json()
        //list-document
        const response = await databases.listDocuments(
            db, voteCollection,[
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteById", voteById),
            ]
        )

        if(response.documents.length > 0){

        }
        //that measn previous vote doest not exist or vote status changes
        if(response.documents[0]?.voteStatus !== voteStatus){
            
        }
    } catch (error : any) {
        return NextResponse.json(
            {
                error: error?.message || "Error in voting"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
        
    }
}