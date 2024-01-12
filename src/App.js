import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
 
`;

const Card = styled.div`
  
  background-color: #092337;
  color: white;
  padding: 20px;
  outline: null;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const CardTitle = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: 700;
  color:white;
`;

const CardInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const InputField = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
 width:100%;
 font-size: 20px;
 font-weight: 600;
 color:black;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
`;

const CardConditions = styled.div`
  display: flex;
  align-items: center;
  gap:10px
`;

const InputFieldRange = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
 
`;

const InputFieldCheckBox = styled.input`
  margin-right: 5px;
`;

function App() {
  const [length, setlength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const generatePasword = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    generatePasword();
  },[length, number, character]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    alert("Password Copied Successfully");
  };

  return (
    <Container>
      <Card>
        <CardTitle>Password Generator</CardTitle>
        <CardInputContainer>
          <InputField
            type="text"
            readOnly
            value={password}
            placeholder="Password"
          />
          <Button onClick={copyPassword}>copy</Button>
        </CardInputContainer>
        <CardConditions>
          <InputFieldRange
            type="range"
            min="8"
            max="200"
            onChange={(e) => setlength(e.target.value)}
          />
          <Label>Length : {length}</Label>
          <InputFieldCheckBox
            type="checkbox"
            defaultChecked={number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <Label>Number</Label>
          <InputFieldCheckBox
            type="checkbox"
            defaultChecked={character}
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <Label>Character</Label>
        </CardConditions>
      </Card>
    </Container>
  );
}

export default App;
