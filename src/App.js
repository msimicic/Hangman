import { useState } from "react";
import { generate } from "random-words";
import "./App.css";

function App() {
  const [currentText, setCurrentText] = useState("");
  const [word, setWord] = useState("");
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [lives, setLives] = useState(7);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const wordGenerator = () => {
    const randomWord = generate({ minLength: 4, maxLength: 10 });
    setWord(randomWord);
  };

  //Funkcija koja prima trenutnu vrijednost s tipkovnice
  const handleValue = (event) => {
    setCurrentText(event.target.value);
  };

  const handleClick = () => {
    //Nakon sto je kliknuta tipka, rijec se postavlja na trenutnu vrijednost primljenu s tipkovnice i trenutna se vrijednost resetira
    setWord(currentText);
    setCurrentText("");

    setCorrectLetters([]); //resetira se lista tocnih slova
    setDisabledButtons([]); //resetira se lista disableanih buttona
    setLives(7); //resetiraju se zivoti
  };

  const checkLetter = (letter) => {
    if (word) {
      //Ako rijec postoji,bilo koje slovo da se stisne ce se disableat
      setDisabledButtons((prevDisabledButtons) => [
        ...prevDisabledButtons,
        letter,
      ]);

      if (word.toLowerCase().includes(letter.toLowerCase())) {
        //Ako ta rijec koja postoji sadrzi kliknuto slovo, stavi ga u listu tocnih
        setCorrectLetters((prevCorrectLetters) => [
          ...prevCorrectLetters,
          letter,
        ]);
      } else {
        //ako ne sadrzi, smanji zivot
        if (lives <= 7 && lives > 0) {
          setLives(lives - 1);
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      {/*Container sa buttonom za generiranje random rijeci,inputom,enter/reset buttonom i brojem zivota*/}
      <div className="form w-75 mx-auto mt-5">
        <div className="d-flex mb-4">
          <button
            onClick={wordGenerator}
            type="button"
            className="btn btn-secondary"
          >
            Generate
          </button>
          <input
            onChange={handleValue}
            value={currentText}
            type="text"
            className="form-control mx-1"
            id="word"
            placeholder="Enter an english word..."
          ></input>
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-secondary"
          >
            Enter/Reset
          </button>
          <span className="lives mx-3">Lives: {lives}</span>
        </div>
      </div>
      {/*Ako rijec postoji,ispisuje se container sa brojem crtica koliko rijec ima slova jer mapiramo slovo po slovo*/}
      {word && (
        <div className="words-container">
          {word.split("").map((letter, index) => (
            //Kreira se container za svako slovo unutar kojeg imamo gornji container sa slovom i donji container sa crticom
            <div key={index} className="letter-container">
              {/*Gornji container sa slovom*/}
              <span className="letter-upper-container">
                {/*ako to slovo postoji u listi tocnih slova, ispisi slovo*/}
                {correctLetters.includes(letter.toUpperCase()) ? (
                  letter.toUpperCase()
                ) : (
                  //Ako slovo ne postoji u listi tocnih i dokle god broj zivota ne dodje do 0,ispisuje prazno,
                  //ako dodje do 0, ispise ih sve da pokaze tocnu rijec
                  <div className="empty-letter">
                    {lives === 0 ? letter.toUpperCase() : ""}
                  </div>
                )}
              </span>
              <span
                //Donji container s crticom nad kojim je slovo
                className="letter-bottom-container"
              />
            </div>
          ))}
        </div>
      )}
      {/*Container sa listom buttona(slova)*/}
      <div className="btn-letter-container mx-auto">
        {alphabet.split("").map((letter, index) => {
          return (
            <button
              onClick={() => {
                checkLetter(letter);
              }}
              type="button"
              className="btn btn-light mx-1 mt-2"
              //Na klik buttona, u checkLetter funkciji slovo se stavlja u disabledButtons pa u atributu disabled radi provjera da se button stavi na disabled ako je unutar disabled liste ili ako je broj zivota 0
              disabled={disabledButtons.includes(letter) || lives === 0}
              key={index}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
