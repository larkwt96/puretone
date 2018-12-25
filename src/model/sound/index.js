export default class Sound {
  wave = undefined;

  constructor(duration, sampleRate) {
    const length = number(duration * sampleRate);
    this.sampleRate = sampleRate;
    this.wave = new Float32Array(length);
  }

  addChord = (chord) => {
    const notes = chord.getNotes();
    for (idx in notes) {
      this.addNote(notes[idx]);
    }
  }

  addSound = (sound) => {
    this.addArray(sound.getWave());
  }

  addNote = (note) => {
    this.addFreq(note.getFreq());
  }

  addFreq = (freq) => {
    for (idx in this.wave) {
      this.wave[idx] += waveFn(idx, this.sampleRate, freq);
    }
  }

  addArray = (arr) => {
    for (idx in arr) {
      if (idx < this.wave.length) {
        this.wave[idx] = arr[idx];
      } else {
        break;
      }
    }
  }

  getWave = () => {
    return this.wave;
  }

  sin(sample, sampleRate, freq) {
    return Math.sin(2 * Math.PI * freq * sample / sampleRate)
  }
};