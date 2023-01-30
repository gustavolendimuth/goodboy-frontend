import PropTypes from 'prop-types';
import React from 'react';
import urlFor from '../services/urlFor';

export default function CategoryDropdown({ mainCategory }) {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle btn-category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {
          mainCategory?.mainCategory.icon && (
            <img className="animal-img-icon" alt={ mainCategory?.mainCategory.icon.alt } src={ urlFor(mainCategory?.mainCategory.icon.image).url() } height="30" width="35" />
          )
        }
        {mainCategory?.mainCategory.name }
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {mainCategory?.subCategories.map((subCategory) => (
          <a
            className="dropdown-item"
            href="https://www.w3schools.com/tags/att_a_href.asp#:~:text=Definition%20and%20Usage,will%20not%20be%20a%20hyperlink."
            key={ subCategory }
            data-testid={ `${subCategory}-caes` }
          >
            {subCategory}
          </a>
        ))}
      </div>
    </div>
  );
}

CategoryDropdown.propTypes = {
  mainCategory: PropTypes.shape({
    mainCategory: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      icon: PropTypes.shape({
        image: PropTypes.shape({
          asset: PropTypes.shape({
            _ref: PropTypes.string,
          }),
        }),
        alt: PropTypes.string,
      }),
    }),
    subCategories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
