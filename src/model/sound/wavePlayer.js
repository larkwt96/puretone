class WavePlayer {
  volume = 0.2;

  constructor(context) {
    this.context = context;
  }

  setVolume = (volume) => {
    if (volume < 0) {
      volume = 0;
    } else if (volume > 1) {
      volume = 1;
    }
    this.volume = volume;
  };

  play = (wave) => {
    // build buffer
    const buf = new Float32Array(wave.getWave().map(v => v * this.volume));
    const buffer = this.context.createBuffer(1, buf.length, this.context.sampleRate)
    buffer.copyToChannel(buf, 0)

    // build sound
    this.source = this.context.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.context.destination);

    // play
    this.source.start(0);
  }

  stop = () => {
    this.source.stop();
    this.source = undefined; // TODO do this?
  }
}

export default WavePlayer;