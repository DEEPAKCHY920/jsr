import { useEffect, useState } from "react";

function getShopStatus() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "12", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const currentMinutes = hour * 60 + minute;

    const openMinutes = 8 * 60;   // 8:00 AM
    const closeMinutes = 20 * 60; // 8:00 PM

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        isOpen: true,
        text: "Open Now • Closes at 8:00 PM",
      };
    } else {
      return {
        isOpen: false,
        text: "Closed Now • Opens at 8:00 AM",
      };
    }
  } catch {
    return {
      isOpen: true,
      text: "Open Every Day • 8:00 AM – 8:00 PM",
    };
  }
}

export default function OpenNowBadge() {
  const [status, setStatus] = useState({
    isOpen: true,
    text: "Open Every Day • 8:00 AM – 8:00 PM",
  });

  useEffect(() => {
    setStatus(getShopStatus());
    const interval = setInterval(() => {
      setStatus(getShopStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`open-badge${status.isOpen ? " open-badge--open" : " open-badge--closed"}`}
      aria-live="polite"
    >
      <span className="open-badge__dot" aria-hidden="true" />
      <span className="open-badge__text">{status.text}</span>
    </div>
  );
}

