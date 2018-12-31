import { IntervalEnum, IntervalModEnum } from ".";
import TetInterval from "./tetInterval";
import NoteBuilder from "../noteBuilder";

let interval;
let interval2;
let interval3;

beforeEach(() => {
  interval = new TetInterval();
  interval2 = new TetInterval();
  interval3 = new TetInterval();
});

// constructor
test("TetInterval constructor", () => {
  expect(interval).toBeDefined();
});

test("TetInterval constructor step", () => {
  expect(interval.step).toBe(0);
});

test("TetInterval constructor get set usePureInterval", () => {
  expect(interval.usePureInterval).toBeFalsy();
  interval.usePureInterval = true;
  expect(interval.usePureInterval).toBeTruthy();
});

test("TetInterval constructor intervals empty", () => {
  expect(interval.intervals.length).toBe(0);
});

// step
test("step is still 0 when _step is undefined", () => {
  expect(interval.step).toBe(0);
  expect(interval.step).toBe(0);
  interval._step = undefined;
  expect(interval.step).toBe(0);
});

// applyInterval
test("adds interval to intervals", () => {
  interval.applyInterval();
  interval.applyInterval(IntervalEnum.MAJOR_THIRD);
  expect(interval.intervals.length).toBe(2);
});

test("_step is reset", () => {
  interval.applyInterval();
  expect(interval._step).toBeUndefined();
});

test("step changes", () => {
  interval.applyInterval();
  interval.applyInterval();
  interval.applyInterval();
  interval.applyInterval();
  expect(interval.step).toBe(0);
});

test("step changes", () => {
  interval.applyInterval(IntervalEnum.MAJOR_SECOND);
  expect(interval.step).toBe(2);
});

test("step changes", () => {
  interval.applyInterval(IntervalEnum.MAJOR_SECOND, []);
  expect(interval.step).toBe(2);
});

test("step changes", () => {
  interval.applyInterval(IntervalEnum.MINOR_SECOND, IntervalModEnum.AUGMENTED);
  expect(interval.step).toBe(2);
});

test("step changes", () => {
  interval.applyInterval(IntervalEnum.MINOR_SECOND, [IntervalModEnum.AUGMENTED]);
  expect(interval.step).toBe(2);
});

// remove interval
test("step changes", () => {
  interval.applyInterval(IntervalEnum.MINOR_SECOND, [IntervalModEnum.AUGMENTED], false);
  interval.applyInterval(IntervalEnum.PERFECT_FIFTH);
  interval.applyInterval(IntervalEnum.PERFECT_FOURTH);
  interval.applyInterval(IntervalEnum.MAJOR_THIRD, [IntervalModEnum.DIMINISHED, IntervalModEnum.DIMINISHED]);
  interval.removeInterval(1, 2);
  expect(interval.step).toBe(0);
});

const minors = [
  IntervalEnum.MINOR_SECOND,
  IntervalEnum.MINOR_THIRD,
  IntervalEnum.MINOR_SIXTH,
  IntervalEnum.MINOR_SEVENTH,
];

const majors = [
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_THIRD,
  IntervalEnum.MAJOR_SIXTH,
  IntervalEnum.MAJOR_SEVENTH,
];

const perfects = [
  IntervalEnum.UNISON,
  IntervalEnum.PERFECT_FOURTH,
  IntervalEnum.TRITONE,
  IntervalEnum.PERFECT_FIFTH,
  IntervalEnum.OCTAVE,
];

const all = minors.concat(majors).concat(perfects);


const doTestSet = (idx) => {
  test("majors to majors: single", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MAJOR);
    interval2.applyInterval(majors[idx]);
    expect(interval.step).toBe(interval2.step);
  });

  test("majors to minors: single", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MINOR);
    interval2.applyInterval(minors[idx]);
    expect(interval.step).toBe(interval2.step);
  });

  test("majors to minors: double and triple", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MINOR);
    interval2.applyInterval(majors[idx], [IntervalModEnum.MINOR, IntervalModEnum.MINOR]);
    interval3.applyInterval(majors[idx], [IntervalModEnum.MINOR, IntervalModEnum.MINOR, IntervalModEnum.MINOR]);
    expect(interval.step).toBe(interval2.step);
    expect(interval2.step).toBe(interval3.step);
  });

  test("minors to minors: single", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MINOR);
    interval2.applyInterval(minors[idx]);
    expect(interval.step).toBe(interval2.step);
  });

  test("minors to majors: single", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MAJOR);
    interval2.applyInterval(majors[idx]);
    expect(interval.step).toBe(interval2.step);
  });

  test("minors to majors: double and triple", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MAJOR);
    interval2.applyInterval(minors[idx], [IntervalModEnum.MAJOR, IntervalModEnum.MAJOR]);
    interval3.applyInterval(minors[idx], [IntervalModEnum.MAJOR, IntervalModEnum.MAJOR, IntervalModEnum.MAJOR]);
    expect(interval.step).toBe(interval2.step);
    expect(interval2.step).toBe(interval3.step);
  });
};
for (let idx in majors) {
  doTestSet(idx);
}

const doTestSet2 = (idx) => {
  test("augment adds one to each", () => {
    interval.applyInterval(all[idx]);
    interval2.applyInterval(all[idx], IntervalModEnum.AUGMENTED);
    expect(interval2.step).toBe(interval.step + 1);
  });

  test("diminished adds one to each", () => {
    interval.applyInterval(all[idx]);
    interval2.applyInterval(all[idx], IntervalModEnum.DIMINISHED);
    expect(interval2.step).toBe(interval.step - 1);
  });

  test("double diminish", () => {
    interval.applyInterval(all[idx]);
    interval3.applyInterval(all[idx], [IntervalModEnum.DIMINISHED, IntervalModEnum.DIMINISHED]);
    expect(interval3.step).toBe(interval.step - 2);
  });

  test("double augment", () => {
    interval.applyInterval(all[idx]);
    interval3.applyInterval(all[idx], [IntervalModEnum.AUGMENTED, IntervalModEnum.AUGMENTED]);
    expect(interval3.step).toBe(interval.step + 2);
  });
};
for (let idx in all) {
  doTestSet2(idx);
}


// all above but lower
const doTestSet3 = (idx) => {
  test("majors to majors: single", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MAJOR, false);
    interval2.applyInterval(majors[idx], undefined);
    expect(interval.step).toBe(-interval2.step);
  });

  test("majors to minors: single", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MINOR, false);
    interval2.applyInterval(minors[idx]);
    expect(interval.step).toBe(-interval2.step);
  });

  test("majors to minors: double and triple", () => {
    interval.applyInterval(majors[idx], IntervalModEnum.MINOR);
    interval2.applyInterval(majors[idx], [IntervalModEnum.MINOR, IntervalModEnum.MINOR], false);
    interval3.applyInterval(majors[idx], [IntervalModEnum.MINOR, IntervalModEnum.MINOR, IntervalModEnum.MINOR]);
    expect(interval.step).toBe(-interval2.step);
    expect(interval2.step).toBe(-interval3.step);
  });

  test("minors to minors: single", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MINOR, false);
    interval2.applyInterval(minors[idx]);
    expect(interval.step).toBe(-interval2.step);
  });

  test("minors to majors: single", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MAJOR, false);
    interval2.applyInterval(majors[idx]);
    expect(interval.step).toBe(-interval2.step);
  });

  test("minors to majors: double and triple", () => {
    interval.applyInterval(minors[idx], IntervalModEnum.MAJOR);
    interval2.applyInterval(minors[idx], [IntervalModEnum.MAJOR, IntervalModEnum.MAJOR], false);
    interval3.applyInterval(minors[idx], [IntervalModEnum.MAJOR, IntervalModEnum.MAJOR, IntervalModEnum.MAJOR]);
    expect(interval.step).toBe(-interval2.step);
    expect(interval2.step).toBe(-interval3.step);
  });
};
for (let idx in majors) {
  doTestSet3(idx);
}

const doTestSet4 = (idx) => {
  test("major minor does nothing to perfect", () => {
    interval.applyInterval(perfects[idx]);
    interval2.applyInterval(perfects[idx], IntervalModEnum.MAJOR);
    interval3.applyInterval(perfects[idx], IntervalModEnum.MINOR);
    expect(interval.step).toBe(interval2.step);
    expect(interval.step).toBe(interval3.step);
  });
};
for (let idx in perfects) {
  doTestSet4(idx);
}

const doTestSet5 = (idx) => {
  test("augment adds one to each", () => {
    interval.applyInterval(all[idx], undefined, false);
    interval2.applyInterval(all[idx], IntervalModEnum.AUGMENTED, false);
    expect(interval2.step).toBe(interval.step - 1);
  });

  test("double augment", () => {
    interval.applyInterval(all[idx], undefined, false);
    interval3.applyInterval(all[idx], [IntervalModEnum.AUGMENTED, IntervalModEnum.AUGMENTED], false);
    expect(interval3.step).toBe(interval.step - 2);
  });

  test("diminished adds one to each", () => {
    interval.applyInterval(all[idx], undefined, false);
    interval2.applyInterval(all[idx], IntervalModEnum.DIMINISHED, false);
    expect(interval2.step).toBe(interval.step + 1);
  });

  test("double diminish", () => {
    interval.applyInterval(all[idx], undefined, false);
    interval3.applyInterval(all[idx], [IntervalModEnum.DIMINISHED, IntervalModEnum.DIMINISHED], false);
    expect(interval3.step).toBe(interval.step + 2);
  });
};
for (let idx in all) {
  doTestSet5(idx);
}

test("super add", () => {
  for (let idx in all) {
    const mods = [
      IntervalModEnum.DIMINISHED,
      IntervalModEnum.AUGMENTED,
      IntervalModEnum.DIMINISHED,
      IntervalModEnum.MAJOR
    ];
    const mods2 = [IntervalModEnum.DIMINISHED, IntervalModEnum.MINOR];
    const mods3 = [IntervalModEnum.DIMINISHED, IntervalModEnum.AUGMENTED];
    interval.applyInterval(all[idx]);
    interval.applyInterval(all[idx], mods3, false);
    interval.applyInterval(all[idx], mods);
    interval.applyInterval(all[idx], mods, false);
    interval.applyInterval(all[idx], mods2);
    interval.applyInterval(all[idx], mods2, false);
    expect(interval.step).toBe(0);
  }
});

const C4 = NoteBuilder.getNoteByName("C4");

// test notes
test("interval is idempotent", () => {
  const note = interval.generate(C4);
  expect(note.freq).toBeCloseTo(C4.freq);
  expect(note.key).toBe(C4.key);
  expect(note.name).toBe(C4.name);
});

test("interval is idempotent", () => {
  interval.usePureInterval = true;
  const note = interval.generate(C4);
  expect(note.freq).toBeCloseTo(C4.freq);
  expect(note.key).toBe(C4.key);
  expect(note.name).toBe(C4.name);
});

test("pure interval has right frequency", () => {
  interval.usePureInterval = true;
  interval.applyInterval(IntervalEnum.PERFECT_FIFTH);
  const note = interval.generate(C4);
  expect(note.freq).toBeCloseTo(C4.freq * 3 / 2);
  expect(note.key).toBe(C4.key + 7);
  expect(note.name).toBe("G4");
});

test("pure interval has right frequency", () => {
  interval.applyInterval(IntervalEnum.PERFECT_FIFTH);
  const note = interval.generate(C4);
  expect(note.freq).toBeCloseTo(C4.freq * Math.pow(2, 7 / 12));
  expect(note.key).toBe(C4.key + 7);
  expect(note.name).toBe("G4");
});

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let major_scale_absolute = [
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_THIRD,
  IntervalEnum.PERFECT_FOURTH,
  IntervalEnum.PERFECT_FIFTH,
  IntervalEnum.MAJOR_SIXTH,
  IntervalEnum.MAJOR_SEVENTH,
  IntervalEnum.OCTAVE,
];

const typeLetterTest = (typeI, letterI) => {
  test("each calculates correct letter", () => {
    interval.applyInterval(major_scale_absolute[typeI]);
    const name = letters[letterI] + "4";
    const currentNote = NoteBuilder.getNoteByName(name);
    const note = interval.generate(currentNote);
    const index = (parseInt(typeI) + parseInt(letterI) + 1) % letters.length;
    const target = letters[index];
    expect(note.name[0]).toBe(target);
  });
};
for (let typeI in major_scale_absolute) {
  for (let letterI in letters) {
    typeLetterTest(typeI, letterI);
  }
}

test("octave jump", () => {
  interval.applyInterval(IntervalEnum.OCTAVE);
  const output = interval.generate(C4);
  expect(output.freq).toBeCloseTo(261.625 * 2);
  expect(output.name).toBe("C5");
  expect(output.key).toBe(40 + 12);
});

let major_scale = [
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MINOR_SECOND,
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MAJOR_SECOND,
  IntervalEnum.MINOR_SECOND,
];

test("can raise octave from C4->C5", () => {
  for (let idx in major_scale) {
    interval.applyInterval(major_scale[idx]);
  }
  const output = interval.generate(NoteBuilder.getNoteByName("C4"));
  expect(output.freq).toBeCloseTo(261.625 * 2);
  expect(output.name).toBe("C5");
  expect(output.key).toBe(40 + 12);
});

test("can raise octave from C4->C5", () => {
  interval.usePureInterval = true;
  for (let idx in major_scale) {
    interval.applyInterval(major_scale[idx]);
  }
  const output = interval.generate(NoteBuilder.getNoteByName("C4"));
  expect(output.freq).not.toBeCloseTo(261.625 * 2);
  expect(output.name).toBe("C5");
  expect(output.key).toBe(40 + 12);
});

test("can raise octave from A4->A5", () => {
  let root = NoteBuilder.getStdA440();
  interval.applyInterval(IntervalEnum.PERFECT_FIFTH);
  interval2.applyInterval(IntervalEnum.OCTAVE, undefined, false);
  for (let count = 0; count < 12; count++) {
    root = interval.generate(root);
    if (root.freq >= 440 * 2) {
      root = interval2.generate(root);
    }
  }
  if (root.freq >= 440 * 1.1) {
    root = interval2.generate(root);
  }
  const A4 = NoteBuilder.getStdA440();
  root.simplifyNote();
  expect(root.freq).toBeCloseTo(A4.freq);
  expect(root.name).toBe(A4.name);
  expect(root.key).toBe(A4.key);
});
