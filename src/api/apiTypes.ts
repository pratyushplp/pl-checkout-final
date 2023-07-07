
// TODO: Add UserId in the future when Multiple Users are present.


export type citation =
{
    filepath:string,
    documentName:string,
    pageNo: number
}

export type AskRequest = {
question: string,
documentType: string,
isDatapoints?: boolean,
}

export type AskResponse =
{
    answer: string [],
    citations: citation[],
    questionId:string,
    error?: string;
}

export type Rating =
{
    questionId: string,
    isLike: boolean,
    isDislike: boolean
}

export type Feedback =
{
    questionId: string,
    feedback: string
}
