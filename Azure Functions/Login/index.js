

module.exports = async function(context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");
    context.log(req);
    // context.log("TEST 1: "+context.bindings.userEntity.password);
    // context.log("TEST 2: "+req.query.password);
    const inPass = req.query.password;
    const dbPass = context.bindings.userEntity.password;
    const dbfirstName = context.bindings.userEntity.firstname;
    const dblastName = context.bindings.userEntity.surname;


    if (inPass == dbPass){
        context.res = {
        status: 200, /* Defaults to 200 */
        body: dbfirstName +" "+dblastName
    }
    }
    else{
         context.res = {
        status: 401,
        body: 'Login Unsuccessful!'
    }
    }

    
};
