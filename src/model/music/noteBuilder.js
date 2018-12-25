class NoteBuilder {
  getStdA440 = () => {
    return Note(440, "A4", 49);
  }

  getNoteByName = (name) => {
    return Note(undefined, name, undefined);
  }

  getNoteByKey = (key) => {
    return Note(undefined, undefined, key);
  }
};

export default NoteBuilder;