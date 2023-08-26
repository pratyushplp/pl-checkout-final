import { AskRequest,AskResponse,Ratings,Feedback } from "./apiTypes";
import Cookies from 'js-cookie';


//TODO:  typescript.
let host_name = import.meta.env.VITE_PL_HOST !== undefined && import.meta.env.VITE_PL_HOST !== null ? import.meta.env.VITE_PL_HOST.toString() : ''

export const AskQuestion = async (askRequest : AskRequest)=>
{
    let endpoint = host_name+"/score";

    const response = await fetch(endpoint,
        {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "sessionId": Cookies.get('sessionId'),
        },
        body: JSON.stringify(askRequest)
        })

    const parsedResponse = await response.json()
    if( !parsedResponse || response.status>299 || !response.ok)
    {
        throw Error()
    }
    return parsedResponse
}

export const UploadFile = async (formData : FormData) =>
{
    //NOTE: session should change after each file upload or after certain period of time
    let endpoint = host_name + "/files"
    const response = await fetch(endpoint,{
        method:"POST",
        headers: {
            "sessionId": Cookies.get('sessionId'),
          },
        body: formData
        })
    const parsedResponse = await response.json()

    if( !parsedResponse || response.status>299 || !response.ok)
    {
        //add logs later
        console.log(`${response.status} :${response.statusText} `)
        return false
    }
    return true
}

export const GenerateSessionId = async () =>
{
    let endpoint = host_name + "/generateSession"
    const response = await fetch(endpoint)

    if(!response || !response.ok || response.status>299)
    {
        (`${response.status} :${response.statusText} `)
        return null
    }

    console.log(response)
    return await response.json()
}

export const SendRating = async (rating: Ratings) =>
{
    let endpoint = host_name+"/ratings";

    const response = await fetch(endpoint,
        {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "sessionId": Cookies.get('sessionId'),
        },
        body: JSON.stringify(rating)
        })

    const parsedResponse = await response.json()
    if(response.status>299 || !response.ok)
    {
        throw Error()
    }
    return parsedResponse
}

export const SendFeedback = async (feedback:Feedback)=>
{
    let endpoint = host_name+"/feedback";
    const response = await fetch(endpoint,
        {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "sessionId": Cookies.get('sessionId'),
        },
        body: JSON.stringify(feedback)
        })

    const parsedResponse = await response.json()
    if(response.status>299 || !response.ok)
    {
        throw Error()
    }
    return parsedResponse
}