import React from "react";

export default function BookingCalendar() {
  return (
    <div className="w-full" style={{ minHeight: 900 }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/wV8NdklZfcMtnGKuWQLL"
        style={{ width: "100%", border: "none", overflow: "hidden", height: "900px" }}
        scrolling="no"
        id="wV8NdklZfcMtnGKuWQLL_1773808218444"
        title="Schedule a Consultation"
      />
    </div>
  );
}

