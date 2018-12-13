const {create, findByRoomname, addUser} = require('../handlers/room')
const {getAll} = require('../handlers/user')

const seeds = [
    {
        roomname: "Data Driven NYC (a FirstMark Event)",
        description: "Data Driven NYC (organized by FirstMark), is a community of tech enthusiasts who are passionate about Big Data, AI, data science and data-driven products and businesses, in New York and beyond."
    },
    {
        roomname: "PLACES NYC",
        description: "Welcome to PLACES NYC.&nbsp; Together we explore, new places, try, new things, and explore, everything New York has to offer"
    },
    {
        roomname: "Design Driven NYC (a FirstMark Event)",
        description: "Design Driven NYC is a community that lives at the intersection of design, user experience, and technology"
    },
    {
        roomname: "Build with Code - New York City",
        description: "Build with Code hosts free weekly JavaScript and Software Engineering workshops, lectures and pair-programming sessions. Welcome!"
    },
    {
        roomname: "Women Who Code NYC",
        description: "Women Who Code is the largest and most active community of engineers dedicated to inspiring women to excel in technology careers"
    },
    {
        roomname: "Hudson Valley Hikers",
        description: "Hudson Valley Hikers Events are by RSVP only on events posted to the calendar"
    },
    {
        roomname: "NYC-Machine-Learning",
        description: "A group to discuss machine learning, information retrieval, natural language processing, knowledge representation, and artificial intelligence"
    },
    {
        roomname: "The New York Python Meetup Group",
        description: "Meet other local Python Programming Language enthusiasts"
    },
    {
        roomname: "New York Real Estate Investors Association (REIA)",
        description: "Calling all Real Estate Investors, Real Estate Professionals, Realtors, Mortgage Banker's, Attorney's, Investment Bankers, Traders, Contractor's and anyone active in the Real Estate Industry."
    },
    {
        roomname: "Shorewalkers",
        description: "Shorewalkers mission is to enhance, enjoy and protect the parks, promenades and paths along the waters in and around New York City, Down State New York and North New Jersey"
    }
]

const run = async function(){
    let users = await getAll()
    for (let seed of seeds){
        let room = await create({
            ...seed,
            creatorID: 2,
            roomstatus: "OPEN"
        })
        addUser(room, users[Math.floor(Math.random()*6)])
    }
}


run()