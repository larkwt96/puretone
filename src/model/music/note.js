import _ from "lodash";
import { Tone } from ".";

// primary symbols
const SHARP = '♯';
const DOUBLE_SHARP = '𝄪';
const NATURAL = '♮';
const FLAT = '♭';

// groups
const SHARPS = 'sS#' + SHARP;
const DOUBLE_SHARPS = 'xX' + DOUBLE_SHARP;
const NATURALS = 'nN' + NATURAL;
const FLATS = 'bB' + FLAT;

// symbol values
const NOTE_VALUES = Object.freeze({
  'C': 0,
  'D': 2,
  'E': 4,
  'F': 5,
  'G': 7,
  'A': 9,
  'B': 11,
});

const ACCIDENTAL_VALUES = {};
ACCIDENTAL_VALUES[DOUBLE_SHARP] = 2;
ACCIDENTAL_VALUES[SHARP] = 1;
ACCIDENTAL_VALUES[NATURAL] = 0;
ACCIDENTAL_VALUES[FLAT] = -1;

class Note extends Tone {
  constructor(freq, note, key, use_flats = false) {
    super(freq);
    this.use_flats = use_flats;
    this.setNoteKey(note, key);
    this.setFreq(freq);
  }

  setFreq = (freq) => {
    if (freq === undefined) { // calculate freq if not given
      this.freq = this.calcFreq();
    }
  };

  setNoteKey = (note, key) => {
    if (key === undefined && note === undefined) {
      throw new Error("must specify key and note");
    } else if (key === undefined) { // key not given
      this.note = this.parseNote(note);
      this.key = this.calcKey();
    } else if (note === undefined) { // note not given
      this.key = key;
      this.note = this.calcNote();
    } else { // note and key given
      this.note = this.parseNote(note);
      this.key = key;
    }
  };

  get name() {
    return this.toString();
  }

  calcFreq = () => {
    if (this.freq === undefined) {
      return 440 * Math.pow(2, (this.key - 49) / 12);
    } else {
      return this.freq;
    }
  };

  toString = () => {
    const { letter, accidentals, octave } = this.note;
    return letter + accidentals + octave;
  };

  parseNote = (note) => {
    let { letter, accidentals, octave } = Note.parseNoteGroups(note)
    letter = letter.toUpperCase();
    accidentals = Note.reformatAccidentals(accidentals);
    return { letter: letter, accidentals: accidentals, octave: octave };
  };

  static parseNoteGroups = (note) => {
    const accidentals = SHARPS + DOUBLE_SHARPS + NATURALS + FLATS;
    const noteRegex = new RegExp("^([A-Ga-g])([" + accidentals + "]*)([-]?[0-9]+)$")
    const match = noteRegex.exec(note);
    if (match === null) {
      throw new Error("Invalid Note: " + note);
    }
    return { letter: match[1], accidentals: match[2], octave: match[3] }
  };

  static replaceAny = (value, old_set, new_value) => {
    for (let idx in old_set) {
      const regexp = new RegExp(old_set[idx], "g")
      value = _.replace(value, regexp, new_value)
    }
    return value
  };

  static reformatAccidentals = (accidentals) => {
    accidentals = Note.replaceAny(accidentals, SHARPS, SHARP);
    accidentals = Note.replaceAny(accidentals, DOUBLE_SHARPS, SHARP + SHARP);
    accidentals = Note.replaceAny(accidentals, FLATS, FLAT);
    accidentals = Note.replaceAny(accidentals, NATURALS, NATURAL);
    let value = 0;
    for (let idx in accidentals) {
      value += ACCIDENTAL_VALUES[accidentals[idx]];
    }
    return Note.valueToAccidental(value);
  };

  static valueToAccidental = (value) => {
    if (value < 0) {
      return _.repeat(FLAT, -value);
    } else if (value === 0) {
      return "";
    } else {
      const sharp = _.repeat(SHARP, value % 2);
      const doubleSharp = _.repeat(DOUBLE_SHARP, Math.floor(value / 2));
      return doubleSharp + sharp;
    }
  };

  calcKey = (note = this.note) => {
    let { letter, accidentals, octave } = note;
    let value = NOTE_VALUES[letter]; // get note value
    const accidentalsArray = Array.from(accidentals);
    for (let idx in accidentalsArray) {
      value += ACCIDENTAL_VALUES[accidentalsArray[idx]];
    }
    value -= 8; // adjust for A0, change to 9 for A0=0
    value += 12 * parseInt(octave); // add octave shift
    return value;
  };

  simplifyNote = (use_flats = this.use_flats, center) => {
    if (center === undefined) {
      this.note = this.calcNote(use_flats);
    } else {
      center = center.toUpperCase();
      if (center.length === 1) {
        center += this.note.octave;
      }
      const paramCheck = /^[A-G][0-9]+$/
      if (paramCheck.exec(center) === null) {
        throw new Error("invalid note")
      }
      this.center(center);
    }
  };

  center = (center) => {
    const root = new Note(undefined, center);
    const accidentalValue = this.key - root.key;
    const accidentals = Note.valueToAccidental(accidentalValue);
    this.note.accidentals = accidentals;
    this.note.letter = center[0];
    this.note.octave = center.substring(1);
  };

  calcNoteValue = () => {
    let value = this.key;
    value += 8; // undo A0 adjustment
    const note_value = value % 12;
    const octave = Math.floor(value / 12).toString();
    return { note_value: note_value, octave: octave };
  }

  calcNote = (use_flats = this.use_flats) => {
    const { note_value, octave } = this.calcNoteValue();
    const { letter, accidentals } = this.getNote(note_value, use_flats);
    return { letter: letter, accidentals: accidentals, octave: octave };
  };

  static _invertNoteValues = () => {
    let value_to_note = {};
    for (let key in NOTE_VALUES) {
      value_to_note[NOTE_VALUES[key]] = key;
    }
    return value_to_note;
  };

  getNote(note_value, use_flats) {
    let letter;
    let accidentals;
    let value_to_note = Note._invertNoteValues();
    if (!(note_value in value_to_note)) {
      ({ letter, accidentals } = this._applySharps(use_flats, letter, value_to_note, note_value, accidentals));
    } else {
      letter = value_to_note[note_value];
      accidentals = "";
    }
    return { letter: letter, accidentals: accidentals };
  }

  _applySharps(use_flats, letter, value_to_note, note_value, accidentals) {
    if (use_flats) {
      letter = value_to_note[(note_value + 1) % 12];
      accidentals = FLAT;
    }
    else {
      letter = value_to_note[(note_value + 11) % 12];
      accidentals = SHARP;
    }
    return { letter, accidentals };
  }
};

export default Note;
