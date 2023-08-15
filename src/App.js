import React from "react";
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      startkapital: 0,
      monatlichesparrate: 0,
      jährlicherzinssatz: 0,
      laufzeit: 0,
      berechnen: false, // Zustand für die Anzeige des Ergebnisses
      ergebnis: "",      // Zustand für das Ergebnis
      detailResult: 0
    };
  }

  calculateResult = () => {
    const { jährlicherzinssatz, startkapital, monatlichesparrate, laufzeit } = this.state;
    if(startkapital === false && monatlichesparrate === false){
      return 0
    }else{
      let startkapitalKopy = startkapital;
    
      for (let i = 0; i < laufzeit; i++) {
        startkapitalKopy = startkapitalKopy * (1 + jährlicherzinssatz / 100); // Zinseszins-Berechnung
        startkapitalKopy += monatlichesparrate * 12; // Monatliche Sparrate hinzufügen
      }
    
      return startkapitalKopy.toFixed(2);
    };
  }
    

  handleInputChange = (e, field) => {
    const newValue = parseFloat(e.target.value);
    // Überprüfen, ob der neue Wert leer ist, und auf 0 setzen
    const updatedValue = isNaN(newValue) ? 0 : newValue;
    this.setState({ [field]: updatedValue });
  }

  calculateDetailResults = (result) => {
    const zinsGewinn = (result - this.state.startkapital - 12*this.state.monatlichesparrate*this.state.laufzeit).toFixed(2);
    const selbstEingezahlt =  (this.state.startkapital + 12 * this.state.monatlichesparrate * this.state.laufzeit).toFixed(2);
    return  [selbstEingezahlt, zinsGewinn]
  }

  handleOnBerechnenClick = () => {
    const result = this.calculateResult();
    this.setState({ berechnen: true, ergebnis: result });
    const details = this.calculateDetailResults(result);
    this.setState({ detailResult: details });
  
    // Nach 2 Sekunden Zustand "berechnen" zurücksetzen
    setTimeout(() => {
      this.setState({ berechnen: false });
    }, 1000);
  };
  

  render() {
    const { berechnen, ergebnis } = this.state;

    return (
      <div className="main">
        <nav>
          <a href="/App.js">Kalkulator odsetek składanych</a>
        </nav>
        <div className="mainLayout">
          <section className="StartKapital">
            <span>Kapitał początkowy</span>
            <div className="inputContainer">
              <input type="text" className="Inputbox" placeholder="€" onChange={(e) => this.handleInputChange(e, "startkapital")} />
            </div>
           
          </section>
          <section className="Monatliche Sparrate">
            <span>Miesięczna stopa oszczędności</span>
            <div className="inputContainer">
              <input type="text" className="Inputbox" placeholder="€" onChange={(e) => this.handleInputChange(e, "monatlichesparrate")} />
              

            </div>
          
          </section>
          <section className="Jährlicher Zinssatz">
            <span>Roczna stopa procentowa</span>
            <div className="inputContainer">
              <input type="text" className="Inputbox" placeholder="%" onChange={(e) => this.handleInputChange(e, "jährlicherzinssatz")} />
            </div>
            
          </section>
          <section className="Laufzeit" id="last" >
            <span>Czas trwania</span>
            <div className="inputContainer">
              <input type="text" className="Inputbox" placeholder="lata" onChange={(e) => this.handleInputChange(e, "laufzeit")} />
            </div>
          </section>
          <section>
            <button className={berechnen ? "button-click-animation" : ""}
            onClick={this.handleOnBerechnenClick}>Obliczać</button>
          </section>
          <section className={berechnen ? "berechnen" : ""}>
            <span>Wynik</span>
            <div className="inputContainer">
              <input placeholder="€" type="text" className="Inputbox" value={ergebnis} readOnly />
            </div>
          </section>
          <section className="details">
            <span>Zainteresowanie: {this.state.detailResult[1]?  this.state.detailResult[1]: 0}€</span>
            <span>Zdeponowany: {this.state.detailResult[0] ? this.state.detailResult[0] : 0}€</span>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
