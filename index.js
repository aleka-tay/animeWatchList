import express from "express";
import axios from "axios";

// Const var
const app = express();
const port = 3000;
const API_URL = "https://api.animechan.io/v1";

// Use function 
app.use(express.urlencoded({extended: true})); // to read input from the field
app.use(express.static("public")); // makes static files accessable to the browser


app.get('/', (req, res) => {
    res.render("index.ejs", {content: "Do you want to be encouraged? "});
});

app.post("/submit", async(req, res) => {
    const endpoint = '/quotes/random';
    try{
        const result = await axios.get(API_URL+endpoint);
        console.log(result.data.data.character.name);
        res.render("index.ejs", {content: result.data.data.content, name: result.data.data.character.name});
    } catch(error){
        console.error(error.message);
    }
})


// This part of the code was writen for reading the anime name given and then implementing it in url

/*app.post("/submit", async(req, res) => {
    const endpoint = `/quotes/random?anime=${req.body.title}>`;
    try{
        const result = await axios.get(API_URL+endpoint);
        console.log(result, API_URL+endpoint);
        res.render("index.ejs", {content: result.json()});
    } catch(error){
        console.error(error.message);
    }
})*/

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});