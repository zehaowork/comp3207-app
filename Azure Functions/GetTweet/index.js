module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    tweetTable = context.bindings.tweetEntity
    tweetTable.sort(function(a,b){
    return new Date(b.RowKey) - new Date(a.RowKey);
    });

        context.res = {
            
            body: tweetTable
        };
    
    
};