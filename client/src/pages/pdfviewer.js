import React from 'react';
import { PDFViewer, Document, Page ,Text } from '@react-pdf/renderer';
import PDF from '@react-pdf/renderer'

export function PDFViewerComponent ({ pdfContent }) {
    console.log(1)
    console.log(pdfContent)
  return (
    // <PDF file={pdfContent} scale={1.3} pages={Infinity} />
    <PDFViewer width="100%" height="500px">
      <Document>
        <Page size="A4">
        <Text>{pdfContent}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

