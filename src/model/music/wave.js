class Wave {
  wave = undefined;

  constructor(length) {
    this.wave = new Float32Array(length);
  }

  getWave = () => {
    return this.wave;
  }
}

export default Wave;