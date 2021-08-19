import React from 'react';

function CancellationPolicy({ trip }) {
  return (
    <div className="wrapper-block">
      <h3 className="h3">Cancellation Policy</h3>
      <ul>
        {trip.cancellationPolicy.map((policy)=><li className="tick">{policy}</li>)}
      </ul>
    </div>
  );
}

export default CancellationPolicy;
