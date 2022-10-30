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
