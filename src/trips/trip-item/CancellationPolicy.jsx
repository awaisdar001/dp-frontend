import React from 'react';

function CancellationPolicy({ cancellationPolicy }) {
  return (
    <div className="wrapper-block">
      <h3 className="h3">Cancellation Policy</h3>
      <ul>
        {cancellationPolicy.map((policy, idx) => <li key={`policy-${idx}`} className="tick">{policy}</li>)}
      </ul>
    </div>
  );
}

export default CancellationPolicy;
