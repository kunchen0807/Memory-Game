import React, {useState, useEffect} from "react";
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg', 'matched': false },
  { 'src': 'https://cdn.cnn.com/cnnnext/dam/assets/210226041421-02-pokemon-anniversary-design-full-169.jpg', 'matched': false },
  { 'src': 'https://legends.pokemon.com/assets/pokemon/pokemon_rowlet.png', 'matched': false },
  { 'src': 'https://pokemonletsgo.pokemon.com/assets/img/common/char-eevee.png', 'matched': false },
  { 'src': 'https://unite.pokemon.com/images/home/team-up/charizard-medium-up.png', 'matched': false },
  { 'src': 'https://images.nintendolife.com/ab7f8a5513bf0/snorlax.large.jpg', 'matched': false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])


  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTures => prevTures + 1);
    setDisabled(false);
  }

  // start a new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;