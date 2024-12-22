import { useEffect, useState } from "react";
import { useFetchClient } from '@strapi/strapi/admin'
import { PLUGIN_ID } from "../pluginId";

export default function useCollectionList() {
    const [collectionsList, setCollectionsList] = useState([]);

    const { get } = useFetchClient();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const { data } = await get(`${PLUGIN_ID}/get-collections-list`);
                setCollectionsList(data.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, []);

    return { collectionsList, setCollectionsList }
}