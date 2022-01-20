let path = require('path');
let cp = require('child_process');

let cli = path.join(__dirname, './cli.js');

describe('cc @sseraphini / cli', () => {
  it('show help', () => {
    let output1 = setup();
    let output2 = setup(['-h']);
    let output3 = setup(['--help']);
    expect(output1).toMatchSnapshot();
    expect(output2).toMatchSnapshot();
    expect(output3).toMatchSnapshot();
  });

  it('show version', () => {
    let output1 = setup(['-v']);
    let output2 = setup(['--version']);
    expect(output1).toMatchSnapshot();
    expect(output2).toMatchSnapshot();
  });

  it('show error', () => {
    let output1 = setup(['-bla']);
    expect(output1).toMatchSnapshot();
  });

  it('opens url with text', async () => {
    let output1 = cp.spawn(cli, ['how can i tweet']);
    await new Promise((res) => {
      output1.on('close', (code) => {
        expect(code).toBe(0); // we assume code exit 0 is a success
        res();
      });
    });
  });
});

function setup(args = [], options = {}) {
  return cp.spawnSync('node', [cli, ...args], { encoding: 'utf-8', ...options })
    .stdout;
}
