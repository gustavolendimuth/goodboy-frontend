import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryResult() {
  const { mainCategory, subCategory } = useParams();

  return (
    <>
      <h1>CategoryResult</h1>
      {mainCategory}
      /
      {subCategory}
    </>
  );
}
