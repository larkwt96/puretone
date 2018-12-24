class Wave {
  wave = undefined;

  constructor(freq, samples, duration) {
    const length = int(samples * duration);
    this.wave = new Float32Array(length);
  }

  getWave = () => {
    return this.wave;
  }
}

export default Wave;