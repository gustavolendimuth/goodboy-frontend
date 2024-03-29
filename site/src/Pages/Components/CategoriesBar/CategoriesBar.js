/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
// import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import CategoryDropdown from './CategoryDropdown';
import Context from '../../../Context/Context';
import './CategoriesBar.css';
import { sortMultipleKeys } from '../../../utils/sort';
import useCategories from '../../../Hooks/useCategories';

export default function CategoriesBar() {
  const { categories } = useContext(Context);
  const [sortedCategories, setSortedCategories] = useState();

  useEffect(() => {
    if (categories && !sortedCategories) {
      setSortedCategories(sortMultipleKeys(categories, ['name']));
    }

    $(document).mouseup((e) => {
      const container = $('.categories');
      const subMenuCheckbox = '.sub-menu-checkbox';

      if ($(e.target).hasClass('toggle')) {
        $(subMenuCheckbox).not(this).prop('checked', false);
      }

      if (
        (
          !container.is(e.target) // if clicked outside
          && container.has(e.target).length === 0 // if clicked outside
        )
        || $(e.target).hasClass('test')
        || $(e.target).hasClass(subMenuCheckbox)
      ) {
        // console.log('clicked outside');
        $('#drop').prop('checked', false); // to uncheck
        $(subMenuCheckbox).prop('checked', false); // to uncheck
      }
    });
  }, [categories]);

  useCategories();

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
                <CategoryDropdown
                  key={ category._id }
                  category={ category }
                  index={ index + 1 }
                />
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}
