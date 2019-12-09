import React from 'react'

import * as jsonexport from 'jsonexport/dist'

interface DownloadProps {
    data: any
}

const DownloadButton: React.SFC<DownloadProps> = ({ data }) => {

    const downloadButtonMethod = () => {
        exportCSV(data)
    }

    const exportCSV = (objectData:any[]) => {
       
        jsonexport(objectData, function (err: any, csv: any) {
            if (err) return console.log(err);
            console.log(csv);
            let csvContent = "data:text/csv;charset=utf-8,"
                + csv
            let encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        });
    }

    return (
        <p>
            <a onClick={downloadButtonMethod} >Download CSV</a>
        </p>
    )

}

export default DownloadButton