import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";
const Protected = () => {
    console.log("KOM HIT")
    const session = useSession()
    console.log(session.data)
 /*
    useEffect(() => {
        if (session.status === "unauthenticated") {
            Router.replace('./Login')
        }
    }, [session.status])
    if (session.status === "authenticated")
            Router.replace('./Home') 
*/
    return <div>Loading...</div>
}

export default Protected