import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Slider } from "./components/Slider";
import { Sidebar } from "./components/Sidebar";
import "./App.css";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Navbar />
        <Slider />
        <Sidebar />
        <BrowserRouter />
      </div>
    );
  }
}

export default App;
