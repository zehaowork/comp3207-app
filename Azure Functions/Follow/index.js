module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

   context.bindings.relationEntity = [];
    context.bindings.relationEntity.push({
            PartitionKey:req.query.targetEmail,
            RowKey: req.query.selfEmail
        });

     context.res = {
        status: 200, /* Defaults to 200 */
        body: "You have Followed!"
    }
};