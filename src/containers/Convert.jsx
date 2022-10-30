import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useConvert } from '../hooks';

const Convert = () => {
  const {
    file,
    csvText,
    jsonText,
    handleUploadFileChange,
    handleCsvToJson,
    handleJsonToCsv,
    handleCsvChange,
    handleJsonChange,
    handleDownload,
  } = useConvert();

  return (
    <Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          border="solid 4px white"
          borderRadius="12px"
          height="400px"
          width="400px"
          padding="8px"
        >
          <Typography variant="h4" sx={{ margin: '8px' }}>
            CSV
          </Typography>
          <Box display="flex" flex="1" flexDirection="column" alignItems="center" justifyContent="center">
            {file && (
              <Typography variant="h5" sx={{ width: '100%', overflow: 'visible' }}>
                {file.name}
              </Typography>
            )}
            <TextField
              multiline
              rows={8}
              value={csvText}
              onChange={handleCsvChange}
              sx={{ bgcolor: 'white', width: '100%' }}
            />
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
          width="400px"
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
            <TextField
              multiline
              rows={12}
              value={jsonText}
              onChange={handleJsonChange}
              sx={{ bgcolor: 'white', width: '100%' }}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Button variant="contained" component="label" sx={{ mb: '10px' }}>
          Upload CSV File
          <input hidden accept=".csv" type="file" onChange={handleUploadFileChange} />
        </Button>
        <Button variant="contained" component="label" sx={{ mb: '10px' }} onClick={handleDownload}>
          Download CSV File
        </Button>
      </Box>
    </Box>
  );
};

export default Convert;
