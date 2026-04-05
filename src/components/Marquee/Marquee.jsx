import { MARQUEE_ITEMS } from '../../data/constants';

export default function Marquee() {
  // Duplicate items to create seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
            <span className="marquee-dot"></span>
          </span>
        ))}
      </div>
    </section>
  );
}
