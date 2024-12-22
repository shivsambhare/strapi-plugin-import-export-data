// const { stringify } = require('csv-stringify/sync');

export async function exportData(ctx) {
    const model = ctx?.request?.query?.collectionName;

    if (!model) {
        return ctx.badRequest('Collection name is required');
    }

    try {
        const data = await strapi.documents(model).findMany();

        // const csv = stringify(data, {
        //     header: true,
        //     columns: Object.keys(data[0] || {}),
        // });

        ctx.send({ success: true, data });
    } catch (error) {
        return ctx.badRequest('Failed to export data', { error });
    }
}
