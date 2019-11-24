module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    rowLength = context.bindings.inTweetEntity.length;
    context.log(rowLength)
    context.bindings.tweetEntity = [];
    let currentTime = new Date().toISOString();
    context.bindings.tweetEntity.push({
            PartitionKey: req.query.email,
            RowKey:currentTime,
            Content: req.query.content
        });



     context.res = {
        status: 200, /* Defaults to 200 */
        body: "Tweet Added!"
    }
};