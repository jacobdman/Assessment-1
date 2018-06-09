const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express(); 

app.use( bodyParser.json() );
app.use(cors())

var count = 3

let animals = [
    {
      name: 'Armadillo',
      id: 1,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Nine-banded_Armadillo.jpg/1200px-Nine-banded_Armadillo.jpg',
      description: '',
    },
    {
      name: 'Tiger',
      id: 2,
      imageUrl: 'http://kids.sandiegozoo.org/sites/default/files/2017-06/animal-hero-tiger_0.jpg',
      description: '',
    },
]

app.get('/api/animals', (req,res) => {
    res.status(200).send(animals)
})

app.post('/api/animals', (req,res) => {
    animals.push({
        name: req.body.data.name,
        id: count,
        imageUrl: req.body.data.img,
        description: '',
    },)
    res.status(200).send(animals)
    count+=1;
})

app.delete('/api/animals', (req,res) => {
    var animalIndex = []
    for (i=0; i<animals.length; i++) {
        if (animals[i]['id']===req.body.id){
            animalIndex = i
        }
    }

    animals.splice(animalIndex, 1)
    res.status(200).send(animals)
})

app.put('/api/animals', (req,res) => {
    var animalIndex = 0
    for (i=0; i<animals.length; i++) {
        if (animals[i]['id']===req.body.id){
            animalIndex = i
        }
    }
   
    

    animals[animalIndex]['description'] = req.body.data.str
    res.status(200).send(animals)
})

const port = 3005;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
