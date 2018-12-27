import Interval from "./interval";
import { Note, NoteBuilder } from "..";

test("constructor", () => {
  expect(new Interval()).toBeDefined();
});

test("generate", () => {
  const interval = new Interval();
  const note = interval.generate(NoteBuilder.getStdA440());
  expect(note.freq).toBeCloseTo(440);
});