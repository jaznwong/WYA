require('dotenv').config()
let app = require('express')();
let roomRoutes = require('./routes/api')

const PORT = process.env.PORT || 8080

app.use('/api', roomRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${port}`)
})