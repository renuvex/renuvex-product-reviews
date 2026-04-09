import React from 'react';

export function ReviewsPreview() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Kart */}
      <rect x="16" y="10" width="248" height="180" rx="8" fill="white" stroke="rgb(227,232,239)" strokeWidth="1" />

      {/* Başlık */}
      <rect x="30" y="24" width="90" height="9" rx="4" fill="rgb(18,25,38)" opacity="0.8" />

      {/* Yıldızlar */}
      {[0,1,2,3,4].map(i => (
        <text key={i} x={30 + i * 18} y="56" fontSize="15" fill={i < 4 ? 'rgb(234,179,8)' : 'rgb(209,213,219)'}>★</text>
      ))}
      <rect x="126" y="46" width="24" height="8" rx="3" fill="rgb(18,25,38)" opacity="0.3" />

      {/* Ayırıcı */}
      <rect x="30" y="66" width="220" height="1" fill="rgb(227,232,239)" />

      {/* Yorum 1 */}
      <rect x="30" y="76" width="32" height="32" rx="16" fill="rgb(247,245,255)" />
      <text x="40" y="97" fontSize="13" fill="rgb(111,85,255)" opacity="0.9">A</text>
      <rect x="70" y="80" width="72" height="7" rx="3" fill="rgb(18,25,38)" opacity="0.7" />
      <rect x="70" y="91" width="148" height="5" rx="2.5" fill="rgb(18,25,38)" opacity="0.2" />
      <rect x="70" y="100" width="120" height="5" rx="2.5" fill="rgb(18,25,38)" opacity="0.14" />

      {/* Ayırıcı */}
      <rect x="30" y="118" width="220" height="1" fill="rgb(227,232,239)" />

      {/* Yorum 2 */}
      <rect x="30" y="128" width="32" height="32" rx="16" fill="rgb(240,253,244)" />
      <text x="39" y="149" fontSize="13" fill="rgb(18,183,106)" opacity="0.9">M</text>
      <rect x="70" y="132" width="56" height="7" rx="3" fill="rgb(18,25,38)" opacity="0.7" />
      <rect x="70" y="143" width="160" height="5" rx="2.5" fill="rgb(18,25,38)" opacity="0.18" />
      <rect x="70" y="152" width="130" height="5" rx="2.5" fill="rgb(18,25,38)" opacity="0.12" />

      {/* Ayırıcı */}
      <rect x="30" y="170" width="220" height="1" fill="rgb(227,232,239)" />

      {/* Yorum 3 kısmi */}
      <rect x="30" y="178" width="32" height="12" rx="6" fill="rgb(255,251,235)" opacity="0.8" />
      <rect x="70" y="180" width="90" height="7" rx="3" fill="rgb(18,25,38)" opacity="0.45" />
    </svg>
  );
}
