module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (context.bindings.relationEntity !== undefined) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Found"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Not Found"
        };
    }
};