import { NoteBuilder } from "..";
import EtInterval from "./etInterval"

let etInterval;
const C4 = 261.62556;
const C5 = 2 * C4;

beforeEach(() => {
  etInterval = new EtInterval();
});

test("constructor", () => {
  new EtInterval();
});

test("constructor params", () => {
  const etInterval = new EtInterval(7, 8);
  expect(etInterval.step).toBe(7);
  expect(etInterval.base).toBe(8);
});

test("setBase", () => {
  etInterval.base = 8;
  expect(etInterval.base).toBe(8);
});

test("setStep", () => {
  etInterval.step = 7;
  expect(etInterval.step).toBe(7);
});

test("generate 440 up to 265.1", () => {
  etInterval.step = 3;
  const { freq } = etInterval.generate(NoteBuilder.getStdA440());
  expect(freq).toBeCloseTo(C5);
});

test("generate 440 down to 265.1", () => {
  etInterval.step = 3 - 12;
  const { freq } = etInterval.generate(NoteBuilder.getStdA440());
  expect(freq).toBeCloseTo(C4);
});