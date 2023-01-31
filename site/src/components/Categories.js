/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
// import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import CategoryDropdown from './categoryDropdown';
import Context from '../context/Context';
import '../css/categories.css';
import { sortObjectArray } from '../services/sort';

export default function Categories() {
  const { categories } = useContext(Context);
  const [sortedCategories, setSortedCategories] = useState();

  useEffect(() => {
    if (categories && !sortedCategories) setSortedCategories(sortObjectArray(categories, ['name']));
    const subMenuCheckbox = '.sub-menu-checkbox';

    $(document).mouseup((e) => {
      const container = $('.categories');

      if ((!container.is(e.target) // if clicked outside
        && container.has(e.target).length === 0)
        || $(e.target).hasClass('sub-category-link')) {
        $('#drop').prop('checked', false); // to uncheck
        $(subMenuCheckbox).prop('checked', false); // to uncheck
      }
      console.log(e.target);
    });

    $(document).ready(function () {
      $('.test').on('click', function () {
        $('#drop').prop('checked', false); // to uncheck
        $(subMenuCheckbox).prop('checked', false); // to uncheck
      });
      $(subMenuCheckbox).on('change', function () {
        $(subMenuCheckbox).not(this).prop('checked', false);
      });
    });
  }, [categories, sortedCategories]);

  if (!categories) return null;

  return (
    <div className="categories bg-secondary">
      <div className="container d-lg-flex justify-content-lg-center">
        <nav className="nav-categories">
          <label htmlFor="drop" className="toggle">&#8801; Categorias</label>
          <input type="checkbox" id="drop" />
          <ul className="menu">
            {
              sortedCategories?.map((category, index) => (
                <CategoryDropdown key={ category._id } category={ category } index={ index + 1 } />
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
