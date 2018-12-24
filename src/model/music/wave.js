class Wave {
  wave = undefined;

  constructor(waves) {
    for (const waveIndex = 0; waveIndex < waves.length; waveIndex++) {
      const wave = waves[waveIndex];
      if (this.wave === undefined) {
        this.wave = new Float32Array(wave.map(() => 0));
      }
      for (const i = 0; i < wave.length; i++) {
        this.wave[i] += wave[i];
      }
    }
    if (this.wave === undefined) {
      this.wave = new Float32Array();
    }
  }

  constructor(freq, duration, sampleRate, waveFn = undefined) {
    const length = int(sampleRate * duration);
    if (waveFn === undefined) {
      waveFn = this.sin;
    }
    this.wave = (new Float32Array(length)).map((v, i) => {
      return waveFn(i, sampleRate, freq);
    });
  }

  getWave = () => {
    return this.wave;
  }

  sin(sample, sampleRate, freq) {
    return Math.sin(2 * Math.PI * freq * sample / sampleRate)
  }
}

export default Wave;