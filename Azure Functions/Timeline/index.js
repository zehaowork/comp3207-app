module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let table_length = context.bindings.tweetEntity.length;
    let followed = context.bindings.relationEntity;
    let tweets = context.bindings.tweetEntity;

    context.log(tweets.length);
    let followersTweet = [];
    context.log(followed)
   
   tweets.forEach(function(tweet){
       let found = false;
       for (f of followed){
           if (f.PartitionKey === tweet.PartitionKey){
               found = true;
               for (user of context.bindings.userEntity){
                   if (f.PartitionKey == user.RowKey){
                       tweet['name'] = user.firstname+ " "+user.surname;
                       continue;
                   }
               }
               break;
           }
       }
       if (found === true){
           followersTweet.push(tweet);
       }
       
   });
   

    followersTweet.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.RowKey) - new Date(a.RowKey);
    });

    context.res = {
        status: 200, /* Defaults to 200 */
        body: followersTweet
    }
};


