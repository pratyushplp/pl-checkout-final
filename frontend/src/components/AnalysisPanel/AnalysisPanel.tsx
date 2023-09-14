import { Pivot, PivotItem } from "@fluentui/react";
// import DOMPurify from "dompurify";
// import { SupportingContent } from "../SupportingContent";
import { CitationView } from "../CitationView/CitationView";
import styles from "./Analysis.module.css";

interface Prop {
    citationTab: boolean
    citationValue: string|null
}

const pivotItemDisabledStyle = { disabled: true, style: { color: "grey" } };

export const AnalysisPanel = ({citationTab,citationValue}:Prop) => {
    // const isDisabledThoughtProcessTab: boolean = !answer.thoughts;
    // const isDisabledSupportingContentTab: boolean = !answer.data_points.length;
    const isDisabledCitationTab: boolean = !citationTab;
    let filePath = citationValue??""

    return (
        <Pivot className= {styles.chatAnalysisPanel}>
            <PivotItem
                itemKey="Citation"
                headerText="Citation"
                headerButtonProps={isDisabledCitationTab ? pivotItemDisabledStyle : undefined}>
                    <img src={filePath} width="100%" height="810px"/>
                {/* <CitationView pageNum={1} pageLimit={1} pdfFilePath={filePath} /> */}
            </PivotItem>
        </Pivot>
    );
};
