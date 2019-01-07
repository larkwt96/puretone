import { Note } from '.';

let c4;

beforeEach(() => {
  c4 = new Note(undefined, "C4");
})

test("no note and no key should throw", () => {
  expect(() => new Note(440)).toThrow();
  expect(() => new Note()).toThrow();
});

test("note and freq overrides default freq", () => {
  const { freq, name, key } = new Note(440, "C4");
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("C4");
  expect(key).toBeCloseTo(40);
});

test("key and freq overrides default freq", () => {
  const { freq, name, key } = new Note(440, undefined, 40);
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("C4");
  expect(key).toBeCloseTo(40);
});

test("key, note, and freq overrides default freq", () => {
  const { freq, name, key } = new Note(440, "C4", 59);
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("C4");
  expect(key).toBe(59);
});

test("note C4 sets freq and key", () => {
  const { freq, name, key } = new Note(undefined, "C4");
  expect(freq).toBeCloseTo(261.625);
  expect(name).toBe("C4");
  expect(key).toBe(40);
});

test("note A4 sets freq and key", () => {
  const { freq, name, key } = new Note(undefined, "A4");
  expect(freq).toBeCloseTo(440);
  expect(name).toBe("A4");
  expect(key).toBe(49);
});

test("note A5 sets freq and key", () => {
  const { freq, name, key } = new Note(undefined, "A5");
  expect(freq).toBeCloseTo(440 * 2);
  expect(name).toBe("A5");
  expect(key).toBe(49 + 12);
});

test("note C5 sets freq and key", () => {
  const { freq, name, key } = new Note(undefined, "C5");
  expect(freq).toBeCloseTo(261.625 * 2);
  expect(name).toBe("C5");
  expect(key).toBe(40 + 12);
});

test("note C#5 has same key as Db5 sets freq and key", () => {
  const { key: DFlat4key } = new Note(440, "C#4");
  const { key: CSharp4key } = new Note(440, "db4");
  expect(DFlat4key).toBe(41);
  expect(CSharp4key).toBe(41);
});

test("key 41 use_flats sets D♭4", () => {
  const { key, name } = new Note(undefined, undefined, 41, true);
  expect(name).toBe("D♭4");
  expect(key).toBe(41);
});

test("key 41 not use_flats sets C♯4", () => {
  const { key, name } = new Note(undefined, undefined, 41, false);
  expect(name).toBe("C♯4");
  expect(key).toBe(41);
});

test("key 40 and C4 sets freq 261.6", () => {
  const { freq: C4 } = new Note(undefined, "C4");
  const { freq: key40 } = new Note(undefined, undefined, 40);
  expect(C4).toBeCloseTo(261.625);
  expect(key40).toBeCloseTo(261.625);
});

test("key 40 and c#b#b4 sets note c4", () => {
  const { name } = new Note(undefined, "c#b#b4");
  expect(name).toBe("C4");
});

test("csS#xXnNbB4 resolves", () => {
  const { name } = new Note(undefined, "csS#xXnNbB4");
  expect(name).toBe("C\u{1D12A}\u{1D12A}♯4");
});

test("C#4 simplifies to Db4 and back", () => {
  const note = new Note(undefined, "C#4");
  note.simplifyNote();
  expect(note.name).toBe("C♯4");
  note.simplifyNote(true);
  expect(note.name).toBe("D♭4");
});

test("csS#xXnNbB4 simplifies", () => {
  const note = new Note(undefined, "csS#xXnNbB4");
  note.simplifyNote();
  expect(note.name).toBe("F4");
});

test("bB#bB4 simplifies", () => {
  const note = new Note(undefined, "CbB#bbB4");
  note.simplifyNote();
  expect(note.name).toBe("G♯3");
  note.simplifyNote(true);
  expect(note.name).toBe("A♭3");
});

test("simplifyNote centering C4 => Dbb4", () => {
  const note = new Note(undefined, "C4");
  note.simplifyNote(undefined, "D4");
  expect(note.name).toBe("D♭♭4");
  expect(note.freq).toBeCloseTo(261.625)
  expect(note.key).toBe(40);
});

test("simplifyNote centering C4 => Dbb4", () => {
  c4.simplifyNote(undefined, "d4");
  expect(c4.name).toBe("D♭♭4");
});

test("simplifyNote centering C4 => Dbb4", () => {
  c4.simplifyNote(undefined, "e4");
  expect(c4.name).toBe("E♭♭♭♭4");
});

test("simplifyNote centering C4 => Dbb4", () => {
  c4.simplifyNote(undefined, "e");
  expect(c4.name).toBe("E♭♭♭♭4");
});

test("simplifyNote centering C4 => Dbb4", () => {
  c4.simplifyNote(undefined, "b3");
  expect(c4.name).toBe("B♯3");
});
