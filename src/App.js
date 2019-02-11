import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/" component={Landing}>Home</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
          </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
         <a class="nav-link" href="/Library" component={Library}>Library <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item dropdown">
         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
         </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
         <a class="dropdown-item" href="/album/the-colors">The Colors</a>
         <a class="dropdown-item" href="/album/the-telephone">The Telephone</a>
      </div>
       </li>
       </ul>
         <form class="form-inline my-2 my-lg-0">
         <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
         <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
         </form>
     </div>
   </nav>
           <h1>Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
