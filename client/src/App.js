import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      entrance: 'Enter the sanctuary',
      feedback: '',
      animals: [],
      input: false,
      newName: '',
      newImage: '',
      description: '',
    }
  }

  display = () => {
    this.setState({ feedback: 'loading...', entrance: ''})
    axios.get('http://localhost:3005/api/animals')
    .then((result) => {
      this.setState({ feedback: '', animals: result.data, input: true })
    })
    .catch((err) => {
      this.setState({ feedback: `There was an issue getting the data ${err}` })
    })
  }

  handleImageChange =(val) => {
    this.setState({ newImage: `${val}` })
  }

  handleNameChange = (val) => {
    this.setState({ newName: `${val}` })
  }

  handleDescriptionChange = (val) => {
    this.setState({ description: `${val}` })
  }

  addAnimal = (name, img) => {
    this.setState({ feedback: 'Adding...' })
    axios.post('http://localhost:3005/api/animals', {
        data: {
          name: name,
          img: img,
        }
    })
    .then((result) => {
      this.setState({ feedback: 'Added new animal successfully!' })
      axios.get('http://localhost:3005/api/animals')
      .then((result) => {
        this.setState({ feedback: '', animals:result.data })
      })
    })
    .catch((err) => {
      this.setState({ feedback: `There was an issue adding the animal ${err}` })
    })
  }

  deleteAnimal = (id) => {
    this.setState({ feedback: 'Deleting...' })
    axios.delete('http://localhost:3005/api/animals', {
      data: {
        id: id,
      }
    })
    .then((result) => {
      this.setState({ feedback: 'Animal deleted!' })
      axios.get('http://localhost:3005/api/animals')
      .then((result) => {
        this.setState({ feedback: '', animals: result.data })
      })
    })
    .catch(err => {
      this.setState({ tab: `failed to delete ${err}`})
    })
  }

  updateAnimal = (str, id) => {
    axios.put('http://localhost:3005/api/animals', {
      data: {
        str: str,
        id: id,
      }
    })
    .then((result) => {
      axios.get('http://localhost:3005/api/animals')
      .then((result) => {
        this.setState({ feedback: '', animals: result.data })
      })
    })
    .catch(err => {
      this.setState({ tab: `failed to add desctription ${err}`})
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <div>
            {this.state.entrance 
            ? <div>
            <p id='enter'>{this.state.entrance}</p>
            <br />
              <button className="enterbutton">
                <img className="imgbutton" 
                  src='https://vignette.wikia.nocookie.net/jurassicpark/images/f/fe/Gate_Entrance_%282%29.JPG/revision/latest?cb=20121109061245' 
                  alt="Jurrasic Gates" 
                  onClick={() => { this.display() }} />
              </button>
            </div> 
            : null}
          </div>

          <p>{this.state.feedback}</p>

              {this.state.input ?
              <div className='addAnimal'>
                <input placeholder='Enter New Animal Name'
                onChange={ (e) => this.handleNameChange(e.target.value) }></input>
                <input placeholder='Enter New Animal Image Link' 
                onChange={ (e) => this.handleImageChange(e.target.value) }></input>
                <button onClick={() => { this.addAnimal(this.state.newName, this.state.newImage) }}>Add Animal</button>
                <br />
                {this.state.feedback}
              </div>
              : null}

          {this.state.animals.map(animal => (
            <div className='animals'>
              <img src={animal.imageUrl} />
              {animal.name}
              <div className='description'>
              <input onChange={ (e) => this.handleDescriptionChange(e.target.value) }
              placeholder='Enter Animal Description'></input>
              <button onClick={() => { this.updateAnimal(this.state.description, animal.id) }}>Add Description</button>
                  <p>{animal.description}</p>
                </div>
              <button onClick={() => { this.deleteAnimal(animal.id) }}>
                <img id='deletebutton'
                src='https://cdn.pixabay.com/photo/2016/10/10/01/49/delete-1727486_1280.png'
                alt='Delete'
                />
              </button>
            </div>)
          )}
        </div>
      </div>
    );
  }
}

export default App;
