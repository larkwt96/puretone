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
    if (key === undefined && note === undefined) {
      throw new Error("must specify key and note");
    } else if (key === undefined) {
      this.note = this.parse_note(note);
      this.key = this.calc_key();
    } else if (note === undefined) {
      this.key = key;
      this.note = this.calc_note();
    } else {
      this.note = this.parse_note(note);
      this.key = key;
    }
    if (freq === undefined) {
      this.freq = this.calc_freq();
    }
  }

  get name() {
    return this.toString();
  }

  calc_freq = () => {
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

  parse_note = (note) => {
    let { letter, accidentals, octave } = Note.parse_note_groups(note)
    letter = letter.toUpperCase();
    accidentals = Note.reformat_accidentals(accidentals);
    return { letter: letter, accidentals: accidentals, octave: octave };
  };

  static parse_note_groups = (note) => {
    const accidentals = SHARPS + DOUBLE_SHARPS + NATURALS + FLATS;
    const noteRegex = new RegExp("^([A-Ga-g])([" + accidentals + "]*)([-]?[0-9]+)$")
    const match = noteRegex.exec(note);
    if (match === null) {
      throw new Error("Invalid Note: " + note);
    }
    return { letter: match[1], accidentals: match[2], octave: match[3] }
  };

  static replace_any = (value, old_set, new_value) => {
    for (let idx in old_set) {
      const regexp = new RegExp(old_set[idx], "g")
      value = _.replace(value, regexp, new_value)
    }
    return value
  };

  static reformat_accidentals = (accidentals) => {
    accidentals = Note.replace_any(accidentals, SHARPS, SHARP);
    accidentals = Note.replace_any(accidentals, DOUBLE_SHARPS, SHARP + SHARP);
    accidentals = Note.replace_any(accidentals, FLATS, FLAT);
    accidentals = Note.replace_any(accidentals, NATURALS, NATURAL);
    let value = 0;
    for (let idx in accidentals) {
      value += ACCIDENTAL_VALUES[accidentals[idx]];
    }
    return Note.value_to_accidental(value);
  };

  static value_to_accidental = (value) => {
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

  calc_key = (note = this.note) => {
    let { letter, accidentals, octave } = note;
    let value = NOTE_VALUES[letter]; // get note value
    Array.from(accidentals).map(v => {
      value += ACCIDENTAL_VALUES[v];
    });
    value -= 8; // adjust for A0, change to 9 for A0=0
    value += 12 * parseInt(octave); // add octave shift
    return value;
  };

  simplify_note = (use_flats = this.use_flats) => {
    this.note = this.calc_note(use_flats);
  };

  calc_note = (use_flats = this.use_flats) => {
    let value = this.key;
    value += 8; // undo A0 adjustment
    let octave = "" + Math.floor(value / 12);
    let value_to_note = {};
    for (let key in NOTE_VALUES) {
      value_to_note[NOTE_VALUES[key]] = key;
    }
    let note_value = value % 12;
    let letter;
    let accidentals;
    if (!(note_value in value_to_note)) {
      if (use_flats) {
        letter = value_to_note[(note_value + 1) % 12];
        accidentals = FLAT;
      } else {
        letter = value_to_note[(note_value + 11) % 12];
        accidentals = SHARP;
      }
    } else {
      letter = value_to_note[note_value];
      accidentals = "";
    }
    return { letter: letter, accidentals: accidentals, octave: octave };
  };
};

export default Note;