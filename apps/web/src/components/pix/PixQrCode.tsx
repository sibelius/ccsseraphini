import React from 'react';
import QRCode from 'qrcode.react';
import { emv } from './emv';

export const PixQrCode = () => {
  return <QRCode value={emv} />;
};
