import { Stack, StackItem} from "@fluentui/react";
import styles from "./Answer.module.css";
import type {AskResponse} from "../../Utils"
import {Button,Input} from "antd"

interface Props {
    answer: AskResponse;
    isSelected?: boolean;
}

export const Answer = ({
    answer,
    isSelected,
}: Props) => {


    const { TextArea } = Input;


    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            {!!answer.answer && (
                <>
                <p>
                    {answer.answer}
                </p>
                <Stack.Item >
                    <p>
                        Hello World!
                    </p>
                </Stack.Item>
                </>
            )}

        </Stack>
    );
};
