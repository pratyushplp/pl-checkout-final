import { useRef, useState, useEffect } from "react";
import {ExampleDatapoints} from "../../components/Example"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import styles from "./Chat.module.css";

const Chat = () => {

    //for example Datapoints
    const [selectedDatapoints, setSelectedDatapoints] = useState<CheckboxValueType[]>([])
    const [path, setPath] = useState<string|null>(null)

    const makeApiRequest = async (question: string) => {
        console.log(question)
    }

    //for example Datapoints
    const onSelectedDatapoints=(value:CheckboxValueType[])=>
    {
        setSelectedDatapoints(value)
    }

    const onSelectedPath=(value:string|null)=>
    {
        setPath(value)
    }

    const [selectedFile, setSelectedFile] = useState<File|null>();


    return (
        <div className={styles.container}>
              <div className={styles.chatRoot}>
                <div className={styles.chatEmptyState}>
                            <h2 className={styles.chatEmptyStateTitle}>Chat with your data</h2>
                            <h3 className={styles.chatEmptyStateSubtitle}>Enter prompt or choose from below</h3>
                            <ExampleDatapoints onSend={question => makeApiRequest(question)} selectedDatapoints= {selectedDatapoints} onSelectedDatapoints = {onSelectedDatapoints} path={path} onSelectedPath = {onSelectedPath}/>
                </div>
                </div>
        </div>
    );
};

export default Chat;


