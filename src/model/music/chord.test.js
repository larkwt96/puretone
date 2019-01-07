import Chord from "./chord";
import { EtInterval, Interval } from "./interval";
import { Tone } from '.';
import { SoundType } from '../sound';

let chord;

beforeEach(() => {
  chord = new Chord(new Tone(440));
});

test("Chord constructor", () => {
  expect(chord.root.freq).toBe(440);
});

test("soundType ", () => {
  chord.generate(44100);
  expect(chord._sound).toBeDefined();
  chord.soundType = SoundType.FADE;
  expect(chord._sound).toBeUndefined();
});

test("get notes", () => {
  expect(chord._notes).toBeUndefined();
  const notes = chord.notes;
  expect(notes).toBeDefined();
  expect(chord._notes).toBeDefined();
});

test("duration low", () => {
  chord.duration = -5;
  expect(chord.duration).toBeCloseTo(0);
});

test("duration high", () => {
  chord.duration = 5;
  expect(chord.duration).toBeCloseTo(1);
});

test("duration mid", () => {
  chord.duration = .5;
  expect(chord.duration).toBeCloseTo(.5);
});

test("duration sound", () => {
  chord.duration = 0.5;
  chord.generate();
  expect(chord.sound).toBeDefined();
  chord.duration = 0.5;
  expect(chord.sound).toBeDefined();
});

test("duration sound change", () => {
  chord.duration = 0.5;
  chord.generate();
  expect(chord.sound).toBeDefined();
  chord.duration = 0;
  expect(chord.sound).toBeUndefined();
});

test("", () => {
  expect(chord._notes).toBeUndefined();
  expect(chord.notes).toBeDefined();
  expect(chord._notes).toBeDefined();
});

test("add interval actually adds", () => {
  chord.addInterval(new Interval());
  expect(chord.intervals.length).toBe(1);
})

test("add interval", () => {
  chord.generate();
  expect(chord._sound).toBeDefined();
  chord.addInterval(new Interval());
  expect(chord._sound).toBeUndefined();
})

test("rem inter", () => {
  chord.addInterval(new EtInterval(-9));
  chord.addInterval(new Interval());
  chord.addInterval(new Interval());
  chord.removeInterval(1, 2);
  expect(chord.intervals.length).toBe(1);
  expect(chord.intervals[0].generate(new Tone(440)).freq).toBeCloseTo(261.6255);
});
