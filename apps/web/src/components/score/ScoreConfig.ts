export const mobileData = {
  profile: {
    padding: `15px 0`,
    justifyContent: 'center',
    containerJustifyContent: 'flex-start',
    maxWidth: '20ch',
    fontSize: '90%',
    fontWeight: '',
    textAlign: 'center',
    textMarginLeft: '',
    margin: '40px 0 0 0',
  },
  info: {
    columns: 'repeat(2, 1fr)',
    justifyContent: 'center',
    margin: '15px 0 0 0',
    gap: '12px 0',
    width: '210px',
  },
  wrapper: {
    width: '100%',
    bottom: '7vh',
    containerHeight: 'inherit',
  },
  number: {
    transform: ``,
    transformOrigin: '',
  },
};

export const defaultData = {
  profile: {
    justifyContent: 'flex-start',
    containerJustifyContent: 'center',
    maxWidth: '60ch',
    fontSize: 'large',
    fontWeight: 'bold',
    textAlign: 'left',
    textMarginLeft: '10px',
    margin: '0px 0 0 30px',
  },
  info: {
    columns: 'repeat(3, 1fr)',
    justifyContent: 'flex-start',
    margin: '30px 0 0 60px',
    gap: '10px 50px',
    width: '375px',
  },
  wrapper: {
    width: 'fit-content',
    bottom: '30px',
  },
  number: {
    transform: `rotate(90deg) translateY(calc(100px * var(--size)))`,
    transformOrigin: 'bottom right',
  },
};
