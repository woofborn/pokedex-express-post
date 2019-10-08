const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';
// const file = 'data.json'

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');



/**
 * ===================================
 * Routes
 * ===================================
 */


 app.get('/', (request, response) => {

  response.render('landing')

});

 // app.get('/?', (request,response) => {


 //    jsonfile.readFile(file, (err, obj) => {

 //        console.log(err)
 //        let pokeList = obj.pokemon
 //        let pokeArray;

 //        for (let i=0; i<obj.pokemon.length;i++){
 //            pokeArray.push(pokeList[i]["name"])

 //        }

 //        console.log(pokeArray)

 //  // // save the request body
 //          jsonfile.writeFile(file, obj, {spaces:2},(err) => {
 //            console.error(err)

 //    // now look inside your json file

 //         });
 //    })

 // })

app.get('/pokemon/new', (request,response) => {
    response.render('home')
})


app.post('/pokemon', function(request, response) {

    console.log(request.body);
    let pokeNew = request.body

    let pokeKey = Object.keys(pokeNew)
    console.log(pokeKey)

    for (let i=0; i<pokeKey.length; i++){
        let key = pokeKey[i]
        console.log(key + "key name")
        console.log(pokeNew[key] + "value of key on request")
        if (pokeNew[key] === ""){
            console.log(pokeNew[key] + "empty key")
             response.render('error')
        }
    }

    const data = {
        "id": pokeNew.id,
        "num": pokeNew.num,
        "name": pokeNew.name,
        "img": pokeNew.image,
        "height": pokeNew.height,
        "weight": pokeNew.weight
    }

    jsonfile.readFile(file, (err, obj) => {

        console.log(err)
        let pokeList = obj.pokemon

        obj.pokemon.push(pokeNew)
        console.log(obj.pokemon[obj.pokemon.length-1])

  // // save the request body
          jsonfile.writeFile(file, obj, {spaces:2},(err) => {
            console.error(err)

    // now look inside your json file

         });
    })
    response.render('pokemon', data)

});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));