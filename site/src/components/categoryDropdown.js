/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
// import urlFor from '../services/urlFor';

export default function CategoryDropdown2({ category, index }) {
  if (!category) return null;

  return (
    <li>
      <label htmlFor={ `drop-${index}` } className="toggle">
        {category?.name}
      </label>
      <a href="#">
        {category?.name}
      </a>
      <input type="checkbox" className="sub-menu-checkbox" id={ `drop-${index}` } />
      <ul>
        {category?.subCategories.map((subCategory) => (
          <li className=" text-nowrap" key={ subCategory }>
            <Link to={ `/${category.name}/${subCategory}` }>{subCategory}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
