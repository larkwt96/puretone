import Chord from "./chord";
import Note from "./note"

test("Chord constructor", () => {
  new Chord(new Note(440));
});