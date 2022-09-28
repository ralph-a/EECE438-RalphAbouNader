const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let contacts = [{
    "id": "8765",
    "name": "Big H",
    "profession": "Renewable Energy",
    "mobile_number": "03299872",
    "telephone_number": "01999888",
},
{
    "id": "00000",
    "name": "Johnny Bunny",
    "profession": "Plumber",
    "mobile_number": "01999222",
    "telephone_number": "04000111",
},
{
    "id": "202203",
    "name": "Tamer B",
    "profession": "Competitive Gamer",
    "mobile_number": "01923923",
    "telephone_number": "04523959",
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const contact = req.body;

    // output the contact to the console for debugging
    console.log(contact);
    contacts.push(contact);

    res.send('contact is added to the database');
});

app.get('/contact', (req, res) => {
    res.json(contacts);
});

app.get('/contact/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // searching contacts for the id
    for (let contact of contacts) {
        if (contact.id === id) {
            res.json(contact);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('contact not found');
});

app.delete('/contact/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // remove item from the contacts array
    contacts = contacts.filter(i => {
        if (i.id !== id) {
            console.log("not deleted")
            return true;
           
        }
        
        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('contact is deleted');
});

app.post('/contact/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
    const newcontact = req.body;

    console.log(newcontact);




    // remove item from the contacts array
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]

        if (contact.id === id) {
            contacts[i] = newcontact;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('contact is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));