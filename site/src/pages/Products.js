import React from 'react';
import { useParams } from 'react-router-dom';

export default function Products() {
  const { query } = useParams();
  return (
    <div>
      Products
      {' '}
      {query}
    </div>
  );
}
