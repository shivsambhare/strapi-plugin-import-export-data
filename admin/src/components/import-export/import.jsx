import React, { useState } from 'react';
import {
    Button,
    Loader,
    Modal,
    SingleSelect,
    SingleSelectOption,
    Typography,
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin'
import useCollectionList from '../../utils/customHook';
import { PLUGIN_ID } from '../../pluginId';

const ImportCSV = () => {
    const { collectionsList } = useCollectionList([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { post } = useFetchClient();

    const handleImport = async () => {
        if (!selectedCollection || !file) {
            alert('Please select a collection and upload a file.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('collectionName', selectedCollection);
        formData.append('csv', file);

        try {
            const { data } = await post(`${PLUGIN_ID}/import-data`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.message) {
                alert(data?.message || '');
            } else {
                alert('Failed to import data.');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            alert('An error occurred while importing data.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal.Root>
                <Modal.Trigger>
                    <Button>Import</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Import CSV Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SingleSelect placeholder="Select a collection"
                            onChange={setSelectedCollection}
                            value={selectedCollection}>
                            {collectionsList?.map((key) => (
                                <SingleSelectOption key={key?.uid} value={key?.uid}>{key.name}</SingleSelectOption>
                            ))}
                        </SingleSelect>
                        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                            <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '8px' }}>
                                <Typography variant="beta">Upload CSV File</Typography>
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".csv"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Close>
                            <Button variant="tertiary">Cancel</Button>
                        </Modal.Close>
                        <Button onClick={handleImport} disabled={isLoading}>
                            {isLoading ? 'Importing...' : 'Import Data'}
                        </Button>
                        {isLoading && <Loader />}
                    </Modal.Footer>
                </Modal.Content>
            </Modal.Root>
        </>
    );
};

export default ImportCSV;
