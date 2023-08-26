import { useMemo,useState } from "react";
import { Stack, StackItem} from "@fluentui/react";
import DOMPurify from "dompurify";
import styles from "./Answer.module.css";
import {LikeOutlined,DislikeOutlined} from "@ant-design/icons"
import {Button,Input} from "antd"
import { AskResponse } from "../../api/apiTypes";


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

    const [ratingList, setratingList] = useState<boolean[]>([false,false])
    const [showFeedback, setShowFeedback] = useState<boolean>(false)


    const updateratingList = (e:any) =>
    {
        console.log(e)
        // console.log(((e.target as HTMLButtonElement)))
        const index = e.currentTarget.value as unknown as number
        setratingList((prev)=> prev.map((item,idx)=> idx==index?!item:item))
        console.log(index)
        console.log(ratingList)
    }
const feedbackClicked = (e:any) =>
{
    setShowFeedback((prev)=> !prev)
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
        <Button value={"0"} shape="circle" icon={<LikeOutlined/>}   onClick={updateratingList} style={{backgroundColor: ratingList[0] ?"lightblue":"" }} />
        <div className={styles.rateButton}>
        <Button value={"1"} shape="circle" icon={<DislikeOutlined/>}  onClick={updateratingList} style={{backgroundColor: ratingList[1]?"lightblue":"" }} />
        </div>
        </Stack.Item>
        <Stack.Item className={styles.feedback}>
            <Button onClick={feedbackClicked} className={styles.feedbackButton} style={{backgroundColor: showFeedback ?"lightblue":"" }}>
                Feedback
            </Button>
            {showFeedback &&
            <div >
            <TextArea rows={4} />
            <Button className={styles.feedbackSend} type="primary" size="small">send</Button>
            </div>}
        </Stack.Item>
                </>
            )}

        </Stack>
    );
};
