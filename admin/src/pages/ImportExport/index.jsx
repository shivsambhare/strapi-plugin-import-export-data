import React from 'react';
import ImportCSV from '../../components/import-export/import';
import ExportCSV from '../../components/import-export/export';

const ImportExport = () => {
  return (
    <div>
      <br />
      <ImportCSV />
      <ExportCSV />
    </div>
  );
};

export default ImportExport;
