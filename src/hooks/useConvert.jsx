import React from 'react';
import { parseCSV, stringifyCSV, parseJson, generateFileName, fetchGeoData, insertGeoData } from '../utils/csv';

const useConvert = () => {
  const [file, setFile] = React.useState(undefined);
  const [csvText, setCsvText] = React.useState('');
  const [jsonText, setJsonText] = React.useState('');

  const fileReader = new FileReader();

  const handleUploadFileChange = (event) => {
    setFile(event.target.files[0]);
    fileReader.onload = function (event) {
      const text = event.target.result;
      setCsvText(text);
    };

    fileReader.readAsText(event.target.files[0]);
  };

  const convertCsvFileToJson = React.useCallback((csvText) => {
    const { csvHeader, csvData } = parseCSV(csvText);
    const json = stringifyCSV({ csvHeader, csvData });
    setJsonText(json);
  }, []);

  const handleCsvToJson = () => {
    convertCsvFileToJson(csvText);
  };

  const convertJsonToCsvFile = () => {
    const text = parseJson(jsonText);
    setCsvText(text);
  };

  const handleJsonToCsv = () => {
    convertJsonToCsvFile();
  };

  const handleCsvChange = (event) => {
    setCsvText(event.target.value);
  };

  const handleJsonChange = (event) => {
    setJsonText(event.target.value);
  };

  const handleDownload = () => {
    const fileName = generateFileName();

    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvText));
    link.setAttribute('download', fileName);
    link.click();
  };

  const handleGeolookup = async () => {
    const data = await fetchGeoData();
    const { lat, lon } = data.features[0].properties;
    const update = insertGeoData(jsonText, lat, lon);
    setJsonText(update);
  };

  return {
    file,
    csvText,
    jsonText,
    handleUploadFileChange,
    handleCsvToJson,
    handleJsonToCsv,
    handleCsvChange,
    handleJsonChange,
    handleDownload,
    handleGeolookup,
  };
};

export default useConvert;
