import app from "./app.js"
import 'dotenv/config'

const PORT=process.env.PORT||5000

app.get("/",(req,res)=>{
    res.send()
})

app.listen(PORT,()=>{
    console.log(PORT)
    console.log("server running")
})