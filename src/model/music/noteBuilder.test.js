import { NoteBuilder } from '.';

test("getStdA440 works", () => {
  expect(NoteBuilder.getStdA440()).toBeDefined();
});

test("getStdA440 is right", () => {
  const { freq, name, key } = NoteBuilder.getStdA440();
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("A4");
  expect(key).toBe(49);
});

test("getNoteByKey A4", () => {
  const note = NoteBuilder.getNoteByKey(49);
  const { freq, name, key } = note;
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("A4");
  expect(key).toBe(49);
});

test("getNoteByKey C4", () => {
  const note = NoteBuilder.getNoteByKey(40);
  const { freq, name, key } = note;
  expect(freq).toBeCloseTo(261.6255);
  expect(name).toBe("C4");
  expect(key).toBe(40);
});

test("getNoteByKey C#4", () => {
  const note = NoteBuilder.getNoteByKey(41);
  const { freq, name, key } = note;
  expect(freq).toBeDefined();
  expect(name).toBeDefined();
  expect(key).toBe(41);
});

test("getNoteByKey Db4", () => {
  const note = NoteBuilder.getNoteByKey(41);
  const { freq, name, key } = note;
  expect(freq).toBeDefined();
  expect(name).toBeDefined();
  expect(key).toBe(41);
});

test("getNoteByName", () => {
  const note = NoteBuilder.getNoteByName("C#4");
  expect(note).toBeDefined();
});
