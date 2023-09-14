import { useState } from "react";
import { Page,Document } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface Props {
    pageNum: number,
    pageLimit: number,
    pdfFilePath: string
}

export const CitationView = ({
    pageNum,
    pageLimit,
    pdfFilePath}: Props) =>
{
    let testPath='https://www.africau.edu/images/default/sample.pdf'
    type pdfPages= number|null
    let initialPageNumber = 1
    const [pageNumber, setPageNumber] = useState<number>(1)
    // const [numPages, setNumPages] = useState<pdfPages>(null)


    const onDocumentLoadSuccess = (pageNumber: number)=>
    {
        setPageNumber(pageNumber)
        initialPageNumber=pageNumber
    }

    const changePage = (offset: number) :void =>
    {
        setPageNumber(prev=> prev+offset)
    }

    const test = () =>
    {
        let reader = new FileReader()
        // reader.readAsDataURL()
    }

    //TODO: Add forward and backward compatibility



    return(<div>
            <Document file={pdfFilePath} onLoadSuccess={()=>onDocumentLoadSuccess(pageNum)}>
    <Page height={600} pageNumber={pageNumber} />
    </Document>
    <p>Page number {pageNumber}</p>
    </div>)
}