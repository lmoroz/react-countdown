import React, { Component } from 'react';
import Clock from './Clock';
import Stopwatch from './Stopwatch';
import moment from 'moment';
import './App.css';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    const newDate = moment('12/04/2017', 'DD/MM/YYYY');
    this.state = {
      deadline: newDate.format('LL'),
      deadlineTitle: newDate.locale('ru').format('LL'),
      newDeadline: 0
    }
  }

  changeDeadline() {
    this.setState({
      deadline: this.state.newDeadline,
      deadlineTitle: moment(this.state.newDeadline).locale('ru').format('LL')
    });
  }

  fireApp() {
    console.log('App.fireApp() !');
  }


  render() {
    return (
      <div className="App">
        <div>
          <div className="App-title">Countdown to <span className='deadline'>{ this.state.deadlineTitle }</span>
          </div>
          <Clock deadline={ this.state.deadline } />
          <Form inline className="controls">
            <span>To date: </span>
            <FormControl placeholder='new date' type='date' id='countdowndate' onChange={ event => this.setState({
                                                                                            newDeadline: event.target.value
                                                                                          }) } />
            <Button onClick={ () => this.changeDeadline() }>OK</Button>
          </Form>
        </div>
        <Stopwatch initialValue='00:07' />
      </div>
    );
  }
}

export default App;