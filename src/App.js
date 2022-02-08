import React from "react";
import { Form } from 'react-bootstrap';
import InputControl from "./components/InputControl";

function App() {
  return (
    <div className="App">
      <Form>
        <h1>Auto Suggestor</h1>
        <InputControl
          name="country"
          label="Country"
          placeholder="Enter Country Name"
        />
      </Form>
    </div>
  );
}

export default App;
