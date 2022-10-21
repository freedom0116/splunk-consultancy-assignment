import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useConvert } from '../hooks';

const Convert = () => {
  const { file, isConvertToJson, jsonData, handleUploadFileChange, handleCsvToJson, handleJsonToCsv } = useConvert();

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        border="solid 4px white"
        borderRadius="12px"
        height="400px"
        width="300px"
        padding="8px"
      >
        <Typography variant="h4" sx={{ margin: '8px' }}>
          CSV
        </Typography>
        <Box display="flex" flex="1" flexDirection="column" alignItems="center" justifyContent="center">
          <Button variant="contained" component="label" sx={{ mb: '10px' }}>
            Upload CSV File
            <input hidden accept=".csv" type="file" onChange={handleUploadFileChange} />
          </Button>
          {file && <Typography variant="h5">{file.name}</Typography>}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" margin="10px">
        <Button onClick={handleCsvToJson}>===={'>'}</Button>
        <Button onClick={handleJsonToCsv}>{'<'}====</Button>
      </Box>
      <Box
        border="solid 4px white"
        borderRadius="8px"
        height="400px"
        width="300px"
        padding="8px"
        display="flex"
        flexDirection="column"
      >
        <Box>
          <Typography variant="h4" sx={{ margin: '8px' }}>
            Json
          </Typography>
        </Box>
        <Box flex="1 1 0" sx={{ overflowY: 'scroll' }}>
          {isConvertToJson ? (
            <>
              <Box textAlign="left">
                <Typography variant="body1">[</Typography>
              </Box>
              {jsonData.map((obj) => (
                <Box key={JSON.stringify(obj)} textAlign="left" pl="1rem" sx={{ wordWrap: 'break-word' }}>
                  <Typography variant="body1">{JSON.stringify(obj)},</Typography>
                </Box>
              ))}
              <Box textAlign="left">
                <Typography variant="body1">]</Typography>
              </Box>
            </>
          ) : (
            <Box textAlign="left">
              <Typography variant="body1">[]</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Convert;
