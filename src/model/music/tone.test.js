import { Tone } from ".";

let tone;

beforeEach(() => {
  tone = new Tone();
});

test("constructor", () => {
  const { freq } = new Tone(2563);
  expect(freq).toBe(2563);
});

test("set freq", () => {
  tone.freq = 2563;
  expect(tone.freq).toBe(2563);
});

test("toString", () => {
  tone.freq = 2563;
  expect(tone.toString()).toBe("(2563 hz)");
});