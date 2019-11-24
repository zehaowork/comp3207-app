module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
// Validation handled in the front-end.
    context.bindings.userEntity = [];
    context.bindings.userEntity.push({
            PartitionKey:"UK" ,
            RowKey:req.query.email,
            password: req.query.password,
            firstname:req.query.firstname,
            surname:req.query.surname
        });

     context.res = {
        status: 200, /* Defaults to 200 */
        body: "User Added"
    }
};