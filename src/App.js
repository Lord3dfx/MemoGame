import './App.css';
import Table from "./components/Table/Table";

function App() {

    const cards = ['box', 'box', 'circle', 'circle', 'triangle', 'triangle', 'romb', 'romb', 'ellipse', 'ellipse', 'cross', 'cross']



  return (
    <div className='wrapper'>

        <Table cards={cards}/>
    </div>
  );
}

export default App;
