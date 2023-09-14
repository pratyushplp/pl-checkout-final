import { useState,useEffect } from "react";
import { Stack, TextField} from "@fluentui/react";
import { Modal } from "antd";
import { Send28Filled,Attach24Filled,ArrowUpload24Filled } from "@fluentui/react-icons";
import {NoUploadConfig, UploadSuccessConfig,UploadFailureConfig,SessionExpired} from "../../Utils/Utils"
import { GenerateSessionId, UploadFile } from "../../api";
import Cookies from "js-cookie";

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
            if(!Cookies.get('sessionId'))
            {
                let cookieVal = await GenerateAndReturnCookies()
                modal.warning(SessionExpired)
                return
            }
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

    // const handleFileUpload = () => {
    //     if (selectedFile) {
    //         console.log('c')//RL
    //       // Create a new FormData object

    //     }
    // }

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
        tempFiles.forEach((file,index) =>
        {
            // NOTE: the files name in the frontend and the argument name (i.e. files) in the function MUST be the same
            formData.append("files",file);
        })

        let cookieVal = await GenerateAndReturnCookies()
        if(!cookieVal)
        {
            modal.error(SessionExpired)
            return
        }

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


const GenerateAndReturnCookies = async () =>
{
  let temp_id = await Cookies.get('sessionId')
  if(!temp_id)
  {
      let session = await GenerateSessionId()
      if(session)
      {
          // setting value in cookie and putting expiry date as 1
          await Cookies.set('sessionId', session.sessionId, { expires: 1 });
      }
      else{
        console.log("error generating session id")
        return null
      }

  }
  return Cookies.get('sessionId')
}
    return(
        <>
        {contextHolder}
        <Stack horizontal className={styles.questionInputContainer}>
            <div className={`${styles.questionAttachmentContainer}`}>
            <input type="file" multiple onChange={handleFileChange} style={{display:'none'}} id="icon-button-file" accept=".pdf,.docx,.txt" />
            <label htmlFor="icon-button-file" className={styles.questionInputSendButton}>
            {/* <ArrowUpload24Filled primaryFill="rgba(115, 118, 225, 1)" onClick={handleFileUpload}/> */}
            <ArrowUpload24Filled primaryFill="rgba(115, 118, 225, 1)"/>
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


