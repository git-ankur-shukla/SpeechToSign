import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import { apiCaller } from '../apiCall';
import axios from 'axios'
var qs = require('qs');
import {Howl, Howler} from 'howler';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'audio/x-flac; rate=1600';


class TextStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.text = 'SpeechToSign';
  }

  setDefault() {
    this.text = 'SpeechToSign';
    this.emit("change")
  }

  updateText(text) {
    console.log("updating text");
    this.text = text;
    this.emit("change");
  }

  getText() {
    return this.text;
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_RECORDING': {
        this.setDefault();
        break;
      }
      case 'STOP_RECORDING': {
        console.log("update case")
        this.updateText('nothing');
        break;
      }
      case 'SPEECH_TO_TEXT': {
        console.log('stt');
        // text=SpeechToText.apiCall(action.payload);
        // TODO: this.updateText(action.payload);

        // Making API request
        console.log(action.payload['blob'])

        var object = action.payload['blob']

          axios.post('http://localhost:8000/api/en/en', object)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          this.updateText("res");
      }
    }
  }
}


const textStore = new TextStore;

dispatcher.register(textStore.handleActions.bind(textStore))
// window.store=gifStore;
// window.dispatcher=dispatcher;
export default textStore;