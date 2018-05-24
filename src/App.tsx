import * as React from 'react';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Portfolio</h1>
        </header>
        <div className="app-container container-fluid">
          <span>TODO</span>
        </div>
        <footer className="app-footer">
          <a href="mailto:petteri.roponen@gmail.com">email@address.com</a>
        </footer>
      </div>
    );
  }
}

export default App;
