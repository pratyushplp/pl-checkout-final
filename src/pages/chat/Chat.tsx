import { useRef, useState, useEffect } from "react";
import {ExampleDatapoints} from "../../components/Example"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { QuestionInput } from "../../components/QuestionInput";
import { ClearChatButton } from "../../components/ClearChatButton";
import { UserChatMessage } from "../../components/UserChatMessage";
import { Answer } from "../../components/Answer";
import { Modal } from "antd";
import {config} from "../../Utils/Utils"

import styles from "./Chat.module.css";


type AskResponse = {
    answer: string;
    thoughts: string | null;
    data_points: string[];
    error?: string | undefined;
}

const Chat = () => {

    //for example Datapoints
    const [selectedDatapoints, setSelectedDatapoints] = useState<CheckboxValueType[]>([])
    const [path, setPath] = useState<string|null>(null)
    const [selectedFile, setSelectedFile] = useState<File|null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const lastQuestionRef = useRef<string>("");
    const [error, setError] = useState<unknown>();
    const [answers, setAnswers] = useState<[user: string, response: AskResponse][]>([]);

    const [modal, contextHolder] = Modal.useModal();

    //for example Datapoints
    const onSelectedDatapoints=(value:CheckboxValueType[])=>
    {
        setSelectedDatapoints(value)
    }

    const onSelectedPath=(value:string|null)=>
    {
        setPath(value)
    }


    const clearChat = () => {
        lastQuestionRef.current = "";
        error && setError(undefined);
        setAnswers([]);
    };

    const makeApiRequest = async (question: string) => {

        if(!selectedFile)
        {
            modal.warning(config)
            // TO make sure questions cant be asked without attaching a document first
            return
        }

        lastQuestionRef.current = question;
        error && setError(undefined);
        setIsLoading(true);

        try {
            // setAnswers([...answers, [question, result]]);
            let mock_result = {answer:"Policy number is 456 [1]. Effective date is 2023-1-1 [2].", thoughts:"", data_points: ["Policy_number","Effective_date"]}
            setAnswers([...answers, [question, mock_result]]);

        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };




    return (

        <div className={styles.container}>
            {contextHolder}
            <div className={styles.commandsContainer}>
            <ClearChatButton className={styles.commandButton} onClick={clearChat} disabled={!lastQuestionRef.current || isLoading} />
            </div>
        <div className={styles.chatRoot}>
            <div className={styles.chatContainer}>
                    {lastQuestionRef.current?
                     (<div className={styles.chatMessageStream}>
                     {
                     answers.map((answer, index) => (
                         <div key={index}>
                             <UserChatMessage message={answer[0]} />
                             <div className={styles.chatMessageGpt}>
                                 <Answer
                                     key={index}
                                     answer={answer[1]}
                                 />
                             </div>
                         </div>
                     ))}
                     </div>)
                    :(
                        <div className={styles.chatEmptyState}>
                        <h2 className={styles.chatEmptyStateTitle}>Chat with your data</h2>
                        <h3 className={styles.chatEmptyStateSubtitle}>Enter prompt or choose from below</h3>
                          <ExampleDatapoints onSend={question => makeApiRequest(question)} selectedDatapoints= {selectedDatapoints} onSelectedDatapoints = {onSelectedDatapoints} path={path} onSelectedPath = {onSelectedPath}/>
                    </div>)
                    }

                <div className={styles.chatInput}>
                    <QuestionInput
                        clearOnSend
                        placeholder="Type a question"
                        disabled={isLoading}
                        onSend={question => makeApiRequest(question)}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        selectedDatapoints={selectedDatapoints}
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Chat;


