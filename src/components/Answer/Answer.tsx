import { useMemo,useState,useEffect } from "react";
import { Rating, Stack, StackItem} from "@fluentui/react";
import DOMPurify from "dompurify";
import styles from "./Answer.module.css";
import {LikeOutlined,DislikeOutlined} from "@ant-design/icons"
import {Button,Input} from "antd"
import { AskResponse } from "../../api/apiTypes";
import { SendRating,SendFeedback } from "../../api";
import type { Feedback, Ratings } from "../../api/apiTypes";

//NOTE: Right now the model we are using, provides single answer for a single question.
//Compound questions have not been introduced yet, when they are introduced the response structure has to be changed, to accomodate
//multiple citations in a single answer.


interface Props {
    answer: AskResponse;
    isSelected?: boolean;
    onCitationClicked: (filePath: string) => void;
}


export const Answer = ({
    answer,
    isSelected,
    onCitationClicked,
}: Props) => {

    const { TextArea } = Input;

    const [ratingList, setRatingList] = useState<boolean[]>([false,false])
    const [showFeedback, setShowFeedback] = useState<boolean>(false)
    const [feedback, setFeedback] = useState<string>("")
    useEffect(()=>
    {
        async function sendRatingWrapper(tempRating: Ratings)
        {
            await SendRating(tempRating)
        }
        if(answer && answer.questionId)
        {
            let tempRating : Ratings = {
                questionId: answer.questionId,
                isLike: ratingList[0],
                isDislike: ratingList[1]}

            sendRatingWrapper(tempRating)
        }
    },[ratingList])

    const updateratingList = async (e:any, questionId:string|undefined) =>
    {
        const index = e.currentTarget.value as unknown as number
        setRatingList((prev)=> prev.map((item,idx)=> idx==index?!item:item))
    }

const onFeedbackClicked = async (e:any) =>
{
    setShowFeedback((prev)=> !prev)
}

const onSendClicked = async(e: any) =>
{
    if(answer && answer.questionId)
    {
        let tempFeedback : Feedback = {
            questionId: answer.questionId,
            feedback: feedback}
            await SendFeedback(tempFeedback)
    }
}

const onTextboxChange = (e:any) =>
{
    setFeedback(e.target.value)
}

    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            {answer && (
                <>
                <Stack.Item >
                    <p>
                        {answer.answer}
                    {/* Zip Code = 57069,State Abbrevation = SD, Policy Premium = $1549 */}
                    </p>
                </Stack.Item>
                <Stack.Item>
                    <Stack horizontal wrap tokens={{ childrenGap: 5 }}>
                    </Stack>
                </Stack.Item>
                <Stack.Item className={styles.extras}>
        <Button value={"0"} shape="circle" icon={<LikeOutlined/>}   onClick={(e)=>updateratingList(e,answer?.questionId)} style={{backgroundColor: ratingList[0] ?"lightblue":"" }} />
        <div className={styles.rateButton}>
        <Button value={"1"} shape="circle" icon={<DislikeOutlined/>}  onClick={(e)=>updateratingList(e,answer?.questionId)} style={{backgroundColor: ratingList[1]?"lightblue":"" }} />
        </div>
        </Stack.Item>
        <Stack.Item className={styles.feedback}>
            <Button onClick={onFeedbackClicked} className={styles.feedbackButton} style={{backgroundColor: showFeedback ?"lightblue":"" }}>
                Feedback
            </Button>
            {showFeedback &&
            <div >
            <TextArea rows={4} onChange={onTextboxChange}/>
            <Button className={styles.feedbackSend} onClick={onSendClicked} type="primary" size="small">send</Button>
            </div>}
        </Stack.Item>
                </>
            )}

        </Stack>
    );
};
