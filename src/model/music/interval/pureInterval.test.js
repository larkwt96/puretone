import { PureInterval, IntervalEnum, IntervalStepRatios } from ".";
import { Tone } from "..";

let interval;

beforeEach(() => {
  interval = new PureInterval();
})

test("constructor no args", () => {
  interval = new PureInterval();
  expect(interval.ratio).toBeCloseTo(1);
});

test("constructor one arg", () => {
  interval = new PureInterval(5);
  expect(interval.ratio).toBeCloseTo(5);
});

test("constructor two args", () => {
  interval = new PureInterval(5, 7);
  expect(interval.ratio).toBeCloseTo(5 / 7);
});

test("set ratio", () => {
  interval.set(5, 3);
  expect(interval.ratio).toBeCloseTo(5 / 3);
});

test("set ratio", () => {
  interval.num = 1.5;
  const fifth = new PureInterval(3, 2);
  expect(interval.ratio).toBeCloseTo(fifth.ratio);
});

test("get ratio", () => {
  expect(interval.ratio).toBeCloseTo(1);
});

test("set num", () => {
  interval.num = 7;
  expect(interval.num).toBe(7);
});

test("set den", () => {
  interval.den = 7;
  expect(interval.den).toBe(7);
});

test("generate setnum", () => {
  interval.num = 5;
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 5);
});

test("generate setden", () => {
  interval.den = 5;
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 1 / 5);
});

test("constructor", () => {
  const fifth = IntervalStepRatios[IntervalEnum.PERFECT_FIFTH];
  interval = new PureInterval(fifth);
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 3 / 2);
});

test("set ratio", () => {
  interval.ratio = [6, 4];
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 3 / 2);
});

test("set ratio", () => {
  const fifth = IntervalStepRatios[IntervalEnum.PERFECT_FIFTH];
  const { num, den, ratio } = new PureInterval(fifth);
  expect(num).toBe(3);
  expect(den).toBe(2);
  expect(ratio).toBeCloseTo(3 / 2);
});

test("set num", () => {
  [interval.num, interval.den] = IntervalStepRatios[IntervalEnum.PERFECT_FIFTH];
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 3 / 2);
});

test("set ratio", () => {
  interval.den = 5;
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 1 / 5);
});

test("generate", () => {
  interval.den = 5;
  const { freq } = interval.generate(new Tone(440));
  expect(freq).toBeCloseTo(440 * 1 / 5);
});
