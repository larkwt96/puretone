import Note from "./note";
import TetNote from "./tetNote";

class NoteBuilder {
  static getStdA440 = () => {
    return new TetNote(440, "A4", 49);
  }

  static getNoteByName = (name) => {
    return new Note(undefined, name, undefined);
  }

  static getNoteByKey = (key) => {
    return new Note(undefined, undefined, key);
  }
};

export default NoteBuilder;