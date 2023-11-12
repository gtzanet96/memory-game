//grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//linking the text with the variable so that the text is automatically updated depending the var's value
playerLivesCount.textContent = playerLives;

const cardArray = [
    //παντα στα path φερομαστε λες και ειμαστε στο index.html, οχι στο js file
    {name: 'cat1', img: 'src/images/cat1.jpg'},
    {name: 'cat2', img: 'src/images/cat2.jpg'},
    {name: 'cat3', img: 'src/images/cat3.jpg'},
    {name: 'cat4', img: 'src/images/cat4.jpg'},
    {name: 'cat5', img: 'src/images/cat5.jpg'},
    {name: 'cat11', img: 'src/images/cat11.jpg'},
    {name: 'cat7', img: 'src/images/cat7.jpg'},
    {name: 'cat10', img: 'src/images/cat10.jpg'},
    // δυο φορες το καθε object αφου θελουμε δυο αντιτυπα για το memory game
    {name: 'cat1', img: 'src/images/cat1.jpg'},
    {name: 'cat2', img: 'src/images/cat2.jpg'},
    {name: 'cat3', img: 'src/images/cat3.jpg'},
    {name: 'cat4', img: 'src/images/cat4.jpg'},
    {name: 'cat5', img: 'src/images/cat5.jpg'},
    {name: 'cat11', img: 'src/images/cat11.jpg'},
    {name: 'cat7', img: 'src/images/cat7.jpg'},
    {name: 'cat10', img: 'src/images/cat10.jpg'}
];

/*Randomize cards - κανει sort τυχαια το καθε στοιχειο του array τοποθετωντας το πριν η μετα το προηγουμενο του στοιχειο αναλογα με 
το αν βγαινει καθε φορα το "0.5 - Math.random()" θετικος ή αρνητικος αριθμος */
const randomize = () => cardArray.sort(() => 0.5 - Math.random());
    
//Generate the HTML cards
const generateCards = () => {
    randomize();
    cardArray.forEach((item) => {
        //φτιαχνουμε την καθε καρτα να χει εμπρος και πισω πλευρα
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        //και αναθετουμε κλασεις για να παρουν το καταλληλο css (και οχι μονο)
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Αναθετουμε το path της εικονας στο element της εικονας που φτιαξαμε προηγουμενως
        face.src = item.img;
        card.setAttribute('name', item.name);
        //Αναθετουμε ως παιδια τα στοιχεια που φτιαξαμε στο section που υπαρχει εξαρχης στο html αρχειο μας
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        //Φτιαχνει-αρχικοποιει την καρτα με eventListener πανω της, για να ανιχνευει τα κλικ
        card.addEventListener('click', (e) => {
            //με το .toggle() βαζει και βγαζει τη συγκεκριμενη κλαση που κανει μεσω css το rotate
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    })
    console.log(cardArray);
}

//Check if cards match
const checkCards = (e) => {
    const clickedCard = e.target; /*δινει <div class="back ή front"></div> οταν πατας τις καρτες, δηλ το element,
    οποτε προσθετουμε το pointer-events css στις .face, .back κλασεις*/
    clickedCard.classList.add("flipped");
    //θελουμε να ξερουμε ποιες ειναι οι flipped για να ελεγξουμε αν ειναι ιδιες ή οχι
    const flippedCards = document.querySelectorAll(".flipped");
    //θελουμε να ξερουμε ποσες toggled εχουμε ανα πασα στιγμη για να ξερουμε αν κερδισαμε
    const toggleCards = document.querySelectorAll(".toggleCard");
    //για να μη μπορουμε να κλικαρουμε την ιδια καρτα δυο φορες
    clickedCard.style.pointerEvents = "none";
    //Logic
    if (flippedCards.length === 2) {
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                //για να μην μπορουμε να ξαναπατησουμε αυτες τις δυο καρτες εφοσον ηδη βρηκαμε το match
                //card.style.pointerEvents = "none";
            })
        }
        else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "all";
                //το setTimeout() θελει function σαν πρωτο ορισμα, οχι method που ειναι το classList.remove() χωρις το 
                //function keyword (ή στην προκειμενη χωρις το arrow function οπως το καναμε)
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            })
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                //setTimeout(() => location.reload(), 1000);
                setTimeout(() => restart("You lost!"), 800);
                //restart("You lost!");
            }
        }
    }
    //Ελεγχος για το αν νικησαμε
    if(toggleCards.length === 16) {
        setTimeout(() => restart("You won!"), 800);
    }
}

const restart = (text) => {
    let cardData = randomize();
    let cards = document.querySelectorAll('.card');
    let faces = document.querySelectorAll('.face');
    //μεχρι να κανουμε restart δε θελουμε να μπορουμε να κλικαρουμε τιποτα
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        //για να γυρισουν ολες στην αρχικη τους πλευρα
        cards[index].classList.remove('toggleCard');
        //Randomize - περιμενουμε να περασει 1δευτ πριν κανουμε randomize τις καρτες για να μη φανει που ειναι ποια
        //στις θεσεις που ξανακλεινουν οσες ειχαμε βρει. Θελουμε δηλ. πρωτα να κλεισουν οι καρτες και μετα να γινει το
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.img;
            cards[index].setAttribute("name", item.name);
            //και τωρα ξαναεπιτρεπουμε το clicking
            section.style.pointerEvents = "all";
        }, 1000)
    })
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
}

generateCards();

