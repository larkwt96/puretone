import NoteBuilder from '../noteBuilder'

class TEtInterval extends EtInterval {
  base = 12;
  root = NoteBuilder.getStdA440();

  setRoot = (root) => {
    this.root = root;
  }

  getNote(root) {
    // TODO: follow configuration from above variables. Relative to root, if
    // defined, otherwise, this.root.
  }
}

export default TEtInterval;