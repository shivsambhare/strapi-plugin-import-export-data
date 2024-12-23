import React, { useState, useEffect } from 'react';
import {
    Button,
    Loader,
    Modal,
    SingleSelect,
    SingleSelectOption,
} from '@strapi/design-system';
import { PLUGIN_ID } from '../../pluginId';
import useCollectionList from '../../utils/customHook';
import { useFetchClient } from '@strapi/strapi/admin'

const ExportCSV = () => {
    const { collectionsList } = useCollectionList([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { get } = useFetchClient();

    async function jsonToCsv(jsonData) {
        // Convert JSON to a 2D array
        const dataArray = Object.values(jsonData).map(item => Object.values(item));

        // Get the header row from the first item
        const header = Object.keys(jsonData[0]).join(',');

        // Create CSV string
        const csvString = [header, ...dataArray.map(row => row.join(','))].join('\n');

        return csvString;
    }
    
    async function handleExport() {
        if (!selectedCollection) {
            alert('Please select a collection.');
            return;
        }

        try {
            setIsLoading(true);
            // Perform the GET request
            const { data } = await get(`${PLUGIN_ID}/export-data?collectionName=${selectedCollection}`);

            // if (!data.data || !Array.isArray(data.data)) {
            //     throw new Error('Invalid JSON response. Expected an array of objects.');
            // }

            // Convert JSON to CSV using csv-stringify
            const csv = await jsonToCsv(data.data);


            // Create a Blob for the CSV
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

            if (blob) {
                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);

                // Trigger download or process the Blob URL
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${selectedCollection}-export.csv`); // Set a file name for the download
                document.body.appendChild(link);
                link.click();
                link.remove();

                // Revoke the URL after use to release memory
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to fetch data.');
            }

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            alert('Failed to export data');
        }
    };

    return (
        <>
            <Modal.Root>
                <Modal.Trigger>
                    <Button>Export</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Export CSV Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SingleSelect placeholder="Select a collection"
                            onChange={setSelectedCollection}
                            value={selectedCollection}>
                            {collectionsList?.map((key) => (
                                <SingleSelectOption key={key?.uid} value={key?.uid}>{key.name}</SingleSelectOption>
                            ))}
                        </SingleSelect>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Close>
                            <Button variant="tertiary">Cancel</Button>
                        </Modal.Close>
                        <Button onClick={() => handleExport()} disabled={isLoading}>
                            {isLoading ? 'Exporting...' : 'Export Data'}
                        </Button>
                        {isLoading && <Loader />}
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};

export default ExportCSV;
