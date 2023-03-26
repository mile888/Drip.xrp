import React from 'react';
import Image from 'next/image';
import { useQRCode } from 'next-qrcode';

function Qr(props) {
  const { Image } = useQRCode();
  const size =  300

  return (
    <Image
      text={props.url || "https://github.com/bm777"}
      alt="qr"
      options={{
        type: 'image/jpeg',
        quality: 0.3,
        level: 'M',
        margin: 3,
        scale: 4,
        width: 300,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}

export default Qr