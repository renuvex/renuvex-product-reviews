import React from 'react';

export function BadgePreview() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Ürün kartı 1 */}
      <rect x="16" y="10" width="114" height="180" rx="10" fill="white" stroke="rgb(227,232,239)" strokeWidth="1" />
      {/* Ürün görseli placeholder */}
      <rect x="26" y="20" width="94" height="96" rx="6" fill="rgb(247,245,255)" />
      {/* Görsel içi ikon */}
      <rect x="56" y="52" width="34" height="4" rx="2" fill="rgb(213,205,255)" />
      <rect x="62" y="60" width="22" height="4" rx="2" fill="rgb(213,205,255)" />
      {/* Ürün adı */}
      <rect x="26" y="124" width="68" height="7" rx="3.5" fill="rgb(18,25,38)" opacity="0.75" />
      {/* Fiyat */}
      <rect x="26" y="136" width="44" height="6" rx="3" fill="rgb(18,25,38)" opacity="0.35" />
      {/* Badge rozeti */}
      <rect x="26" y="152" width="94" height="24" rx="12" fill="rgb(247,245,255)" stroke="rgb(213,205,255)" strokeWidth="1" />
      {[0,1,2,3,4].map(i => (
        <text key={i} x={34 + i * 13} y="169" fontSize="11" fill={i < 4 ? 'rgb(234,179,8)' : 'rgb(209,213,219)'}>★</text>
      ))}
      <text x="104" y="169" fontSize="10" fill="rgb(111,85,255)" fontWeight="600">4.2</text>

      {/* Ürün kartı 2 */}
      <rect x="150" y="10" width="114" height="180" rx="10" fill="white" stroke="rgb(227,232,239)" strokeWidth="1" />
      {/* Ürün görseli placeholder */}
      <rect x="160" y="20" width="94" height="96" rx="6" fill="rgb(240,253,244)" />
      {/* Görsel içi ikon */}
      <rect x="190" y="52" width="34" height="4" rx="2" fill="rgb(187,247,208)" />
      <rect x="196" y="60" width="22" height="4" rx="2" fill="rgb(187,247,208)" />
      {/* Ürün adı */}
      <rect x="160" y="124" width="68" height="7" rx="3.5" fill="rgb(18,25,38)" opacity="0.75" />
      {/* Fiyat */}
      <rect x="160" y="136" width="44" height="6" rx="3" fill="rgb(18,25,38)" opacity="0.35" />
      {/* Badge rozeti */}
      <rect x="160" y="152" width="94" height="24" rx="12" fill="rgb(240,253,244)" stroke="rgb(187,247,208)" strokeWidth="1" />
      {[0,1,2,3,4].map(i => (
        <text key={i} x={168 + i * 13} y="169" fontSize="11" fill="rgb(234,179,8)">★</text>
      ))}
      <text x="238" y="169" fontSize="10" fill="rgb(18,183,106)" fontWeight="600">5.0</text>
    </svg>
  );
}
