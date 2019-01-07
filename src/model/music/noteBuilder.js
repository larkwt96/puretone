import { Note } from '.';

class NoteBuilder {
  static getStdA440 = () => {
    return new Note(440, "A4", 49);
  };

  static getNoteByName = (name) => {
    const note = new Note(undefined, name, undefined);
    return note;
  };

  static getNoteByKey = (key) => {
    const note = new Note(undefined, undefined, key);
    return note;
  };
};

export default NoteBuilder;
