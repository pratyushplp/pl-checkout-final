import { useState,useEffect } from "react";
import { Stack, TextField} from "@fluentui/react";
import { Modal } from "antd";
import { Send28Filled,Attach24Filled,ArrowUpload24Filled } from "@fluentui/react-icons";
import {NoUploadConfig, UploadSuccessConfig,UploadFailureConfig} from "../../Utils/Utils"
import { UploadFile } from "../../api";

import styles from "./QuestionInput.module.css";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface Props {
    onSend(questions: string):void,
    setSelectedFile(value:File[]|null):void,
    disabled: boolean,
    placeholder?: string,
    clearOnSend?: boolean,
    selectedFile?: File[]|null,
    selectedDatapoints?: CheckboxValueType[]
}

//TODO:
// assing a type for selectedFile

 export const QuestionInput = ({onSend, setSelectedFile, disabled, placeholder="Enter Prompt", clearOnSend,selectedFile,selectedDatapoints}:Props) =>
{
    const [question, setQuestion] = useState<string>("");
    const [modal, contextHolder] = Modal.useModal();


    const sendQuestion = async () =>
    {
        console.log(selectedDatapoints)
        if(disabled || (!question.trim() && (!selectedDatapoints || selectedDatapoints.length==0)))
        {
            return
        }
        if(!selectedFile)
        {
            modal.warning(NoUploadConfig)
            //setIsModalOpen(true)
            return
        }
        await onSend(question)

        if(clearOnSend){
            setQuestion("");
        }
    }

    const onEnterPress = async (ev: React.KeyboardEvent<Element>) =>
    {
        if(ev.key === "Enter" && !ev.shiftKey)
        {
            ev.preventDefault();
            await sendQuestion();
        }
    }

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const sendQuestionDisabled = disabled || !question.trim();

    const handleFileUpload = () => {
        console.log('a')//RL
        if (selectedFile) {
            console.log('c')//RL
          // Create a new FormData object

        }
    }

    const handleFileChange = async (event:any) => {
        let tempFiles=[]
        if(event.target.files)
        {
            for(let propName in event.target.files)
            {
                if(!Number.isNaN(Number(propName)))
                {
                    tempFiles.push(event.target.files[propName])
                }
            }
        }
        setSelectedFile(tempFiles);
        const formData = new FormData();
        formData.append("session_id","1234567abc")
        tempFiles.forEach((file,index) =>
        {
            // NOTE: the files name in the frontend and the argument name (i.e. files) in the function MUST be the same
            formData.append("files",file,`file_${index}`);
        })
        let success = await UploadFile(formData)
        if(success)
        {
            modal.success(UploadSuccessConfig)
        }
        else
        {
            modal.error(UploadFailureConfig)
        }
        };


    return(
        <>
        {contextHolder}
        <Stack horizontal className={styles.questionInputContainer}>
            <div className={`${styles.questionAttachmentContainer}`}>
            <input type="file" multiple onChange={handleFileChange} style={{display:'none'}} id="icon-button-file" accept=".pdf,.docx,.txt" />
            <label htmlFor="icon-button-file" className={styles.questionInputSendButton}>
            <ArrowUpload24Filled primaryFill="rgba(115, 118, 225, 1)" onClick={handleFileUpload}/>
            </label>
            </div>

            <TextField
                className={`${styles.questionInputTextArea} ${styles.questionInputSendButton}`}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className={styles.questionInputButtonsContainer}>
                <div
                    className={`${styles.questionInputSendButton}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    <Send28Filled primaryFill="rgba(115, 118, 225, 1)" />
                </div>
            </div>
        </Stack>
        </>
    )
}


