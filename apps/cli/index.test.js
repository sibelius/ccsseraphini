jest.mock('open', () => (input) => input);

let { main } = require('./index');

describe('cc @sseraphini / cli', () => {
  let logOriginal;
  let logStub = jest.fn();
  beforeEach(() => {
    logOriginal = console.log;
    console.log = logStub;
  });

  afterEach(() => {
    console.log = logOriginal;
    process.argv = [];
    logStub.mockClear();
  });

  it('show help', async () => {
    process.argv = [null, null];
    await main();
    expect(logStub.mock.calls[0][0]).toMatchSnapshot();

    process.argv = [null, null, '-h'];
    await main();
    expect(logStub.mock.calls[0][0]).toMatchSnapshot();

    process.argv = [null, null, '--help'];
    await main();
    expect(logStub.mock.calls[0][0]).toMatchSnapshot();
  });

  it('show version', async () => {
    process.argv = [null, null, '-v'];
    await main();
    expect(logStub.mock.calls[0]).toMatchSnapshot();

    process.argv = [null, null, '--version'];
    await main();
    expect(logStub.mock.calls[0]).toMatchSnapshot();
  });

  it('show error', async () => {
    process.argv = [null, null, '-blah'];
    await main();
    expect(logStub.mock.calls[0]).toMatchSnapshot();
  });

  it('opens url with text', async () => {
    process.argv = [null, null, 'how do i tweet'];
    let url = await main();
    expect(url).toMatchInlineSnapshot(
      `"https://twitter.com/intent/tweet?text=how do i tweet%0Acc%20%40sseraphini"`,
    );
  });
});
