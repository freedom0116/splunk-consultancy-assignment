import React from 'react';

const useConvert = () => {
  const [file, setFile] = React.useState(undefined);
  const [isConvertToJson, setIsConvertToJson] = React.useState(false);
  const [jsonData, setJsonData] = React.useState([]);

  const fileReader = new FileReader();

  const handleUploadFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setIsConvertToJson(false);
  };

  const convertCsvFileToJson = React.useCallback((text) => {
    const csvHeader = text.slice(0, text.indexOf('\n')).replace('\r', '').split(',');
    let csvData = text
      .slice(text.indexOf('\n') + 1)
      .split('\n')
      .map((s) => s.replace('\r', '').split(','));

    csvData.splice(-1);

    const convertData = csvData.map((data) => {
      let newObject = {};
      csvHeader.forEach((header, index) => {
        newObject = { ...newObject, [header]: data[index] };
      });
      return newObject;
    });

    setJsonData(convertData);
  }, []);

  const handleCsvToJson = () => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        convertCsvFileToJson(text);
      };

      fileReader.readAsText(file);
      setIsConvertToJson(true);
    }
  };

  const convertJsonToCsvFile = () => {
    const headers = Object.keys(jsonData[0]);

    const csvContent = jsonData
      .map((data) => {
        const valueString = headers.map((key) => data[key]).join(',') + '\n';
        console.log(valueString);
        return valueString;
      })
      .join('');

    let fileName = 'json2Csv' + new Date().getTime() + '.csv';

    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
    link.setAttribute('download', fileName);
    link.click();
  };

  const handleJsonToCsv = () => {
    console.log('hi');
    convertJsonToCsvFile();
  };

  return { file, isConvertToJson, jsonData, handleUploadFileChange, handleCsvToJson, handleJsonToCsv };
};

export default useConvert;
