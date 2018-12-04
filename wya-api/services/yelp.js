const yelp = require('yelp-fusion');
// require('dotenv').config({ path: '../.env' })
const apikey = process.env.YELP_APIKEY || require('../config/config.json').services.yelpAPI;

const yelpHandler = {
    client: yelp.client(apikey)
}

/**
 * @param  {string} location - Location for the event
 * @param  {string} category - Categories to search for
 * @param  {int} price - 1: $ , 2: $$, 3: $$$, 4: $$$$
 * @param  {int} openAt - (Optional)unix time
 * @returns {promise} (array)businesses - each entry is a business object with the following keys
        [ 'id',
        'alias',
        'name',
        'image_url',
        'is_closed',
        'url',
        'review_count',
        'categories',
        'rating',
        'coordinates',
        'transactions',
        'price',
        'location',
        'phone',
        'display_phone',
        'distance' ]
 */
yelpHandler.search = async function(location, category,  price, openAt=""){
    let params = {
        location,
        category,
        price
    }
    if(openAt != ""){
        params.open_at = openAt
    }
    console.log(params)
    try{
        let response = await this.client.search(params)
        console.log(response)
        return response.jsonBody.businesses
    }catch(err){
        throw err
    }
}

// example
// yelpHandler.search("nyc", "bars", 1)
//     .then((businesses)=>{
//         console.log(businesses)
//     })

module.exports = {
    yelp: yelpHandler
}
