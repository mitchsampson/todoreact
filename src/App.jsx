import React from "react";
import Header from "./Header";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container mx-auto mt-8">
        <TodoForm />
        <TodoList />
      </main>
      <Footer />
    </div>
  );
}

export default App;