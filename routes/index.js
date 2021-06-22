var express = require('express');
var router = express.Router();
const _ = require("lodash");

var capital = [];
var userTable = [];
var tableNature = [];
var hanoiTab = [];


/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'Semeru Fayat', newText: capital});
});

/* GET tri a bulle. */
router.get('/tri_a_bulle', function (req, res, next) {

    res.render('tri_a_bulle', {title: 'Semeru Fayat', newText: capital, userTable, tableNature});
});

/* GET hanoi. */
router.get('/hanoi', function (req, res, next) {

    res.render('hanoi', {title: 'Semeru Fayat', newText: capital, hanoiTab});
});


// mettre chaque mot de la chaîne en majiscule
router.post('/', function (req, res, next) {

    var userText = req.body.userText;

    var newText = _.startCase(userText);

    capital.push(newText);

    //console.log(capital);

    res.render('index', {title: 'Semeru Fayat', newText: capital});
});


// tri à bulle
router.post('/tri_a_bulle', function (req, res, next) {

    userTable.push(parseInt(req.body.userNumber));
    tableNature.push(req.body.userNumber);

    //console.log(userTable);


    function echanger (t, i, j) {
        var aux = t[i];
        t[i] = t[j];
        t[j] = aux ;
    }
    function trier (t) {
        var n = t. length ;
        for (var i = 0; i < n; i ++) {
            for (var j = 0; j < n-i; j++) {
                if (t[j+1] < t[j]) {
                    echanger (t,j+1,j) ;
                }
            }
        }
        return t;
    }

    trier(userTable)

    /*


    function tri_a_bulle(tab) {
        var changed;
        do {
            changed = false;
            for (var i = 0; i < tab.length - 1; i++) {
                if (tab[i] > tab[i + 1]) {
                    var tmp = tab[i];
                    tab[i] = tab[i + 1];
                    tab[i + 1] = tmp;
                    changed = true;
                }
            }
        } while (changed);
    }

    //var tab = [5, 8, 11, 6, 1, 9, 3];
    tri_a_bulle(userTable);
    //console.log(userTable);
    //console.log(tri_a_bulle(userTable));


     */
    res.render('tri_a_bulle', {tableNature, userTable: userTable});
});


// Tours de Hanoï
router.post('/hanoi', function (req, res, next) {

    var nbDisk = req.body.nbDisk;

    hanoiTab = [];
    function tourHanoi(nbDisk, depart, arrivee, intermediaire){
        if(nbDisk > 0){
            tourHanoi(nbDisk-1,depart, intermediaire, arrivee);
            console.log(`déplacement de ${depart} vers ${arrivee}.`);
            hanoiTab.push(`déplacement de ${depart} vers ${arrivee}.`)
            tourHanoi(nbDisk-1, intermediaire, arrivee, depart);
        }
        return  hanoiTab
    }

    tourHanoi(nbDisk, 'gauche', 'droite', 'mileu');

    //console.log("new table",hanoiTab);
    res.render('hanoi', {hanoiTab: hanoiTab});
});


module.exports = router;
