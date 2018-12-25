class Interval {
  generate = (root) => {
    // unison by default.
    const { freq, name, key } = root;
    return Note(freq, name, key);
  }
};

export default Interval;