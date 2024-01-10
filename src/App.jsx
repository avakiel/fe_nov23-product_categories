/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import categories from './api/categories';
import products from './api/products';
import users from './api/users';

export const App = () => {
  const [state, setState] = useState({
    categories: [...categories],
    products: [...products],
    users: [...users],
    usersFilter: '',
    seletct: [],
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => setState(prevState => ({
                  ...prevState,
                  usersFilter: '',
                }))
                }
                data-cy="FilterAllUsers"
                href="#/"
                className={state.usersFilter === '' ? 'is-active' : null}
              >
                All
              </a>
              {state.users.map(user => (
                <a
                  key={user.id}
                  onClick={() => setState(prevState => ({
                    ...prevState,
                    usersFilter: user.name,
                  }))
                  }
                  data-cy="FilterUser"
                  href="#/"
                  className={
                    state.usersFilter === user.name ? 'is-active' : null
                  }
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                onClick={() => setState(prevState => ({
                  ...prevState,
                  usersFilter: '',
                }))}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {state.products.map((product) => {
                const category = state.categories.find(
                  cat => cat.id === product.categoryId,
                );

                if (state.usersFilter.length !== 0) {
                  const user = state.users.find(
                    u => u.id === category.ownerId,
                  );

                  if (user.name === state.usersFilter) {
                    return (
                      <tr key={product.id} data-cy="Product">
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {product.id}
                        </td>
                        <td data-cy="ProductName">{product.name}</td>
                        <td data-cy="ProductCategory">
                          {category.icon}
                          {' '}
                          -
                          {' '}
                          {category.title}
                        </td>
                        <td
                          data-cy="ProductUser"
                          className={`has-text-${
                            user.sex === 'f' ? 'danger' : 'link'
                          }`}
                        >
                          {user.name}
                        </td>
                      </tr>
                    );
                  }

                  if (!product.id) {
                    return (
                      <p data-cy="NoMatchingMessage">
                        No products matching selected criteria
                      </p>
                    );
                  }
                } else {
                  return (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>
                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {category.icon}
                        {' '}
                        -
                        {' '}
                        {category.title}
                      </td>
                      <td data-cy="ProductUser" className="has-text-link">
                        {
                          state.users.find(u => u.id === category.ownerId)
                            ?.name
                        }
                      </td>
                    </tr>
                  );
                }

                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
