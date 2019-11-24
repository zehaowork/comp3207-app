module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(context.bindings.userEntity);

    if(context.bindings.userEntity !== undefined){
         context.res = {
            body: context.bindings.userEntity
         };
    }
    else{
        context.res = {
            status:400,
            body: "Not Found!"
         };
    }

   
};