export const parseCSV = (text) => {
  const csvHeader = text.slice(0, text.indexOf('\n')).replace('\r', '').split(',');
  let csvData = text
    .slice(text.indexOf('\n') + 1)
    .split('\n')
    .map((s) => s.replace('\r', '').split(','));

  csvData.splice(-1);

  return { csvHeader, csvData };
};

export const stringifyCSV = ({ csvHeader, csvData }) => {
  const jsonData = csvData.map((data) => {
    let newObject = {};
    csvHeader.forEach((header, index) => {
      newObject = { ...newObject, [header]: data[index] };
    });
    return newObject;
  });

  return JSON.stringify(jsonData);
};

export const parseJson = (text) => {
  const obj = JSON.parse(text);
  let headers = new Set([]);
  obj.forEach((data) => {
    Object.keys(data).forEach((header) => {
      headers.add(header);
    });
  });

  const csvData = obj
    .map((data) => {
      const valueString = [...headers].map((key) => data[key] || '').join(',') + '\n';
      console.log(valueString, [...headers]);
      return valueString;
    })
    .join('');
  return [...headers] + '\n' + csvData;
};

export const generateFileName = () => 'json2Csv' + new Date().getTime() + '.csv';

export const fetchGeoData = async () => {
  return await fetch(
    'https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=aa6c564ccc2b471fbefdd671860bd584'
  )
    .then((response) => response.json())
    .catch((err) => {
      console.err(err);
    });
};

export const insertGeoData = (jsonText, lat, lon) => {
  const data = JSON.parse(jsonText);
  const updated = data.map((obj) => ({ ...obj, lat, lon }));
  return JSON.stringify(updated);
};
