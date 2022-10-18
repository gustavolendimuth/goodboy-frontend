import React from 'react';

export default function Checkout() {
  const { session } = useParams();
  return (
    <div>
      Checkout
      {' '}
      {session}
    </div>
  );
}
