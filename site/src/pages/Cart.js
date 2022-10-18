import React from 'react';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const { session } = useParams();
  return (
    <div>
      Cart
      {' '}
      {session}
    </div>
  );
}
