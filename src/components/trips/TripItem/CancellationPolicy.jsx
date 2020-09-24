import React from "react";

function CancellationPolicy() {
  return (
    <div className="wrapper-block">
      <h3 class="h3">Cancellation Policy</h3>
      <ul>
        <li>
          50% of the total amount will be deducted if cancellation notified 7
          days prior to the trip.
        </li>
        <li>
          75% of the total amount will be deducted if cancellation notified 4
          days prior to the trip.
        </li>
        <li>
          100% of the total amount will be deducted if cancellation notified in
          the last 4 days prior to the trip unless the trip is cancelled by the
          management.
        </li>
      </ul>
    </div>
  );
}

export default CancellationPolicy;
