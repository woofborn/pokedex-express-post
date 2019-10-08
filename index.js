const express = require('express');
const jsonfile = require('jsonfile');

// const file = 'pokedex.json';
const file = 'data.json'

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

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/pokemon/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/pokemon/new', (request,response) => {

        response.send(`<h1> POKEMON</h1>
            <form method="POST" action="/pokemon">
      ID:
      <input type="text" name="id"><br>
      Number:
      <input type="text" name="num"><br>
      Name:
      <input type="text" name="name"><br>
      Image:
      <input type="text" name="img"><br>
      Height:
      <input type="text" name="height"><br>
      Weight:
      <input type="text" name="weight"><br>
      <input type="submit" value="Submit">
    </form>`)

})

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

    jsonfile.readFile(file, (err, obj) => {

        console.log("reading")


  // // save the request body
          jsonfile.writeFile(file, request.body, (err) => {
            console.error(err)

    // now look inside your json file
            response.send(request.body);
         });
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));