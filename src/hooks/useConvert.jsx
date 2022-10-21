import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  const csvFileToJson = (text) => {
    // const csvHeader = text.slice(0, text.indexOf("\n")).split(",");

    const csvHeader = text.slice(0, text.indexOf('\n')).replace('\r', '').split(',');
    let csvData = text
      .slice(text.indexOf('\n') + 1)
      .split('\n')
      .map((s) => s.replace('\r', '').split(','));

    csvData.splice(-1);

    const convertData = csvData.map((data) => {
      let newObject = { key: uuidv4() };
      csvHeader.forEach((header, index) => {
        newObject = { ...newObject, [header]: data[index] };
      });
      return newObject;
    });

    console.log(convertData);

    setJsonData(convertData);
  };

  const handleCsvToJson = () => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToJson(text);
      };

      fileReader.readAsText(file);
      setIsConvertToJson(true);
    }
  };

  const handleJsonToCsv = () => {
    console.log('hi');
  };

  return { file, isConvertToJson, jsonData, handleUploadFileChange, handleCsvToJson, handleJsonToCsv };
};

export default useConvert;
