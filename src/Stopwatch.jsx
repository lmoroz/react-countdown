import React, { Component } from 'react';
import './App.css';
import { Form, Button, FormControl } from 'react-bootstrap';
import moment from 'moment';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      timetostop: 0,
      timetostopNew: 0,
      timerInProgress: false
    }
  }

  changeTime(value) {
    let [hours, minutes] = value.toString().split(':');
    this.setState({
      timetostopNew: value,
      hours,
      minutes,
      seconds: '00'
    })
  }

  setNewBound() {
    let [hours, minutes] = this.state.timetostopNew.toString().split(':');
    const nextTime = moment().add({
      hours: hours,
      minutes: minutes
    }).valueOf();

    this.setState({
      timetostop: nextTime,
    })
    return nextTime;
  }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }


  TouchWatch(startTimer = false) {
    console.log('TouchWatch', {
      'startTimer': startTimer,
      'this': this,
      'this.state': this.state,
      'timerInProgress': this.state ? this.state.timerInProgress : undefined,
      'timetostop': this.state ? this.state.timetostop : undefined
    });
    if (!startTimer && (!this.state.timerInProgress || this.state.timetostop === false)) return;

    const newBound = (startTimer) ? this.setNewBound() : this.state.timetostop;
    const leastMSeconds = newBound - Date.parse(new Date());
    if (leastMSeconds <= 0) {
      alert('Hooray!');
      this.ToggleTimer();
      return;
    }
    const hours = this.leading0(Math.floor(leastMSeconds / (1000 * 60 * 60) % 24));
    const minutes = this.leading0(Math.floor((leastMSeconds / 1000 / 60) % 60));
    const seconds = this.leading0(Math.floor((leastMSeconds / 1000) % 60));
    this.setState({
      hours,
      minutes,
      seconds,
      timerInProgress: true
    })
    setTimeout(() => this.TouchWatch(), 1000);
  }

  ToggleTimer() {
    console.log('ToggleTimer', {
      'timerInProgress': this.state.timerInProgress
    });
    if (!this.state.timerInProgress) {
      this.setState({
        timerInProgress: true
      });
      this.TouchWatch(true);
    } else {
      this.setState({
        timerInProgress: false,
        timetostop: false
      });
    }
  }


  componentDidMount() {
    console.log('Stopwatch.this', this);
    document.querySelector('#stopwatchtime').value = this.props.initialValue;
    this.changeTime(this.props.initialValue)
  }

  render() {

    return (
      <div>
        <div className="App-title">Stopwatch</div>
        <div className="presets">
          <div className="Clock-hours">
            { this.state.hours } hours
          </div>
          <div className="Clock-minutes">
            { this.state.minutes } minutes
          </div>
          <div className="Clock-seconds">
            { this.state.seconds } seconds
          </div>
        </div>
        <Form inline className="controls">
          <FormControl placeholder='time to stop' type='time' id='stopwatchtime' onChange={ (event) => this.changeTime(event.target.value) } />
          <Button onClick={ () => this.ToggleTimer() }>
            { this.state.timerInProgress ? 'Stop' : 'Start' }
          </Button>
        </Form>
      </div>

    )
  }


}
export default Stopwatch;