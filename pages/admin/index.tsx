import { Chunker } from "@/models/chunker";
import { useState, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import getServerSession from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { ApiResponse } from "@/types/api";
import { NullExpression } from "mongoose";
// import useApi from "@/hooks/useApi";


export default function Admin() {
    const [chunkers, setChunkers] = useState<Chunker[]|undefined>([]);

    useEffect(() => {
        fetch(`/api/chunkers`)
        .then(res => res.json())
        .then((json: ApiResponse<Chunker[]>) => setChunkers(json.data ?? undefined))
    }, [])



    return <div>Admin</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session || session.user.role !== "admin") {
        return { 
            redirect: { 
                destination: "/", 
                permanent: false 
            } 
        }
    }
    return { props: {} }
}