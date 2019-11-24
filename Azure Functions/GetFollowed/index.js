module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let followList = [];
    let result = [];
    relationTable = context.bindings.relationEntity;
    userTable = context.bindings.userEntity
    relationTable.forEach(function(entity) {
    followList.push(entity.PartitionKey);
    });

// loop through all users  and bind their names 
   for (var i= 0; i<userTable.length;i++){
        
       let found = false;
        followList.forEach(function(entity){
            if (userTable[i].RowKey==entity){
                found = true;
            }
        });
        if (found == true){
            result.push(userTable[i]);
        }
        
   }

   context.log(result)

    context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
};