const inf = require('../package.json');
jest.mock('open', () => (input: string) => input);

let { main: cli } = require('./index');

describe('cc @sseraphini / cli', () => {
  let stub = {
    consoleError: jest.fn(),
    consoleLog: jest.fn(),
    processExit: jest.fn(),
  };
  let original = {
    consoleError: console.error,
    consoleLog: console.log,
    processExit: process.exit,
  };

  beforeEach(() => {
    console.error = stub.consoleError;
    console.log = stub.consoleLog;
    process.exit = stub.processExit as any;
  });

  afterEach(() => {
    console.error = original.consoleError;
    console.log = original.consoleLog;
    process.exit = original.processExit;
    jest.resetAllMocks();
  });

  it('show help with no args', async () => {
    await cli();
    expect(stub.consoleError.mock.calls[0][0]).toContain('Usage:');
  });

  it('show help with -h', async () => {
    await cli(['-h']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain('Usage:');
  });

  it('show help with --help', async () => {
    await cli(['--help']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain('Usage:');
  });

  it('show version with -v', async () => {
    await cli(['-v']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain(inf.version);
  });

  it('show version with --version', async () => {
    await cli(['--version']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain(inf.version);
  });

  it('show error when wrong alias flag passed', async () => {
    await cli(['-b']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain(
      `which wasn't expected, or isn't valid in this context!`,
    );
  });

  it('show error when wrong full flag passed', async () => {
    await cli(['--blah']);
    expect(stub.consoleLog.mock.calls[0][0]).toContain(
      `which wasn't expected, or isn't valid in this context!`,
    );
  });

  it('opens url with text', async () => {
    let url = await cli('how do i tweet');
    expect(url).toMatchInlineSnapshot(
      `"https://twitter.com/intent/tweet?text=how%2Cdo%2Ci%2Ctweet%0Acc%20%40sseraphini"`,
    );
  });
});
