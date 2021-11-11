import {Signer} from '@waves/signer';

import { ProviderWeb } from '@waves.exchange/provider-web';

import React , {useState} from 'react';

import './App.css';

  const waves = new Signer({NODE_URL: 'https://nodes-testnet.wavesnodes.com'});
  const provider = new ProviderWeb('https://testnet.waves.exchange/signer/');
  waves.setProvider(provider);


function App() {


  const [currentState, setCurrentState] = useState("");



  const authfunc = async ()=>{

    
    console.log("AUTH");

    const userData = await waves.login();

    setCurrentState(`
    authorized as <br>
    ${JSON.stringify(userData)}`);

  }




  const faucet = ()=>{

    console.log("FAUCET");


    waves.invoke({
      dApp: "3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn",
      call: {
          function: "faucet"
        }
  }).broadcast().then(
    
    resp=>{
      setCurrentState(`
      faucet response as <br>
      ${resp}`);
  
    });

 
  }

  const putdata = ()=>{

    console.log("DATA");


    const date = new Date();
    waves.data({
        data: [
            {
                key: "lastCall",
                value: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                type: 'string'
            }
        ]
    }).broadcast();

  }

  const transfer = ()=>{

    
console.log("TRANSFER");


    waves.transfer({
      recipient: "3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn",
      amount: 1
  }).broadcast().then( resp=>{
      setCurrentState(`
      faucet response as <br>
      ${resp}`);
  
    });

  }



  return (
    <div className="App">

<button onClick={()=>{
        authfunc();
        }}>
            WavesSigner AUTH
        </button>


      <header className="App-header">
        <p>
        response:  {currentState}
        </p>
        </header>

        <p>
        <button onClick={()=>{
      
        authfunc();
        }}>
            WavesSigner AUTH
        </button>


      <button onClick={()=>{faucet()}}>
      Faucet
      </button>


      <button onClick={()=>{putdata()}}>
       Put Data in account storage
      </button>
  
      <button onClick={transfer}>
       Transfer to Alice
      </button>

      </p>
    </div>
  );
}

export default App;
