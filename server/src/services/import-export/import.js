const fs = require('fs');
const { parse } = require('csv-parse/sync');

export async function importData(ctx) {
    const { files } = ctx?.request;
   
    // Check if the file is uploaded
    if (!files || !files.csv) {
        return ctx.badRequest('CSV file is required');
    }

    try {
        const file = files.csv;

        // Read file synchronously
        const content = fs.readFileSync(file.filepath, 'utf-8');

        const records = parse(content, { columns: true }) || [];

        const model = ctx?.request?.body?.collectionName;

        // Save each record
        for (const record of records) {
            await strapi.documents(model).create({ data: record });
        }

        ctx.send({ message: `${records.length} records imported successfully` });
    } catch (error) {
        return ctx.badRequest('Failed to import data', { error });
    }
}

export function getCollectionsList(ctx) {
    const contentTypes = strapi.contentTypes;

    // Filter to get only collections (ignoring single types or plugins)
    const collections = Object.entries(contentTypes)
        .filter(([uid, ct]) => ct.kind === 'collectionType' && !uid.startsWith('plugin::') && !uid.startsWith('admin::'))
        .map(([uid, ct]) => ({
            uid,
            name: ct.info.displayName,
        }));

    ctx.send({ success: true, data: collections, message: 'Collections list fetched successfully' });
}