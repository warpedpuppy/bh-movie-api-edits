const express = require('express'), 
        morgan = require('morgan'), 
        app = express(),
        bodyParser = require('body-parser'),
        uuid = require('uuid');

let movies = [
   { 
        title: 'Batman',
        genre: 'Action',
        director: {
            name: "Director Name"
        }
    },
    {
      title:'Indiana Jones and the Last Crusade',
      genre:'Lethal Weapon 2',
      director: {
          name: "Director Name"
      }
    },
    {
        title:'Honey, I Shrunk the Kids',
        genre:'Adventure',
        director: {
            name: "Director Name"
        }
    },
    {
        title:'Rain Man',
        genre:'Comedy',
        director: {
            name: "Director Name"
        }
    },
    {
        title:'Look Whos Talking',
        genre: 'Comedy',
        director: {
            name: "Director Name"
        }
    },
    {
        title: 'Ghostbusters II',
        genre: 'Comedy',
        director: {
            name: "Director Name"
        }
    },
    {
        title: 'Back to the Future Part II',
        genre: 'Adventure',
        director: {
            name: "Director Name"
        }
    },
    {
        title: 'Parenthood',
        genre: 'Comedy',
        director: {
            name: "Director Name"
        }
    },
    {
        title: 'Dead Poets Society',
        genre: 'Drama',
        director: {
            name: "Director Name"
        }
    }
];

let users = [
    {
        id: 1,
        username: 'Dan',
        password: 'password1',
        email: 'dan@yahoo.com',
        birthday: '05-15- 2005'
    }
];

app.use('/documentation.html', express.static('public'));

app.use(morgan('common'));

app.use(bodyParser.json());
    

//---------Movie Requests--------

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:title', (req, res) => {
    res.send('Details have not been loaded yet');
});


app.get('/movies/directors/:name', (req, res) => {
    let moviesByGenre = movies.filter( function(movie){ return movie.director.name === req.params.name } )
    res.json(moviesByGenre);
});

app.get('/movies/genre/:name', (req, res) => {

    let moviesByGenre = movies.filter( function(movie){ return movie.genre === req.params.name } )
    res.json(moviesByGenre);

});

app.post('/movies', (req, res) => {
    let newMovie = req.body;

    if(!newMovie.title) {
        const message = 'Missing title in request body';
        res.status(400).send(message);
    }else {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});

app.delete('/movies/remove/:title', (req, res) => {
    res.send('Successful delete request returning list with movies removed that were deleted');
});

//--------User requests--------

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    let newUser = req.body;
    
    if (!newUser.username) {
        const message = 'Username not found';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    }
});

app.put('/users/:username', (req, res) => {

    let newData = req.body;

    let user = users.find((user) => {return user.username === req.params.username});

    if (newData.email) {
        user.email = newData.email;
    }
    if (newData.password) {
        user.password = newData.password;
    }
    if (newData.birthday) {
        user.birthday = newData.birthday;
    }

    res.json({user})
});

app.delete('/users/delete/:id', (req, res) => {

    let user = users.find( (user) => { return user.id == req.params.id } );
    if (user) {
        users = users.filter( (user) => { return user.id !== req.params.id } );
        res.status(201).send('User ' + req.params.id + ' was deleted.');
    } else {
        res.status(201).send('User not found.');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to My Flix');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

    
    