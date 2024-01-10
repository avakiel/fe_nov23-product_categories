/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import categories from './api/categories';
import products from './api/products';
import users from './api/users';

export const App = () => {
  const goods = products.map((product) => {
    const category = categories.find(e => e.id === product.categoryId);
    const owner = users.find(user => user.id === category.ownerId);

    return { ...product, category, owner };
  });

  const [sortFilter, setSortFilter] = useState({
    userName: '',
    categories: [],
    reverse: false,
    search: '',
    good: goods,
  });

  function filter(good) {
    let prepareGoods = [...good];

    if (sortFilter.userName !== '') {
      prepareGoods = [...prepareGoods].filter(
        item => item.owner.name === sortFilter.userName,
      );
    }

    if (sortFilter.categories.length !== 0) {
      prepareGoods = prepareGoods
        .filter(e => sortFilter.categories.includes(e.category.title));
    }

    if (sortFilter.search !== '') {
      prepareGoods = prepareGoods
        .filter(e => e.name.toLowerCase()
          .includes(sortFilter.search.toLowerCase()));
    }

    if (sortFilter.reverse) {
      prepareGoods = [...prepareGoods].reverse();
    }

    return prepareGoods;
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => setSortFilter(prevState => ({
                  ...prevState,
                  userName: '',
                }))
                }
                data-cy="FilterAllUsers"
                href="#/"
                className={sortFilter.userName === '' ? 'is-active' : null}
              >
                All
              </a>
              {users.map(user => (
                <a
                  key={user.id}
                  onClick={() => setSortFilter(prevState => ({
                    ...prevState,
                    userName: user.name,
                  }))
                  }
                  data-cy="FilterUser"
                  href="#/"
                  className={
                    sortFilter.userName === user.name ? 'is-active' : null
                  }
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={event => setSortFilter(prev => ({
                    ...prev,
                    search: event.target.value,
                  }))
                  }
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
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
                onClick={() => setSortFilter(prev => ({
                  ...prev,
                  categories: [],
                }))
                }
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categories.map(e => (
                <a
                  key={e.id}
                  onClick={() => setSortFilter(prev => ({
                    ...prev,
                    categories: [...sortFilter.categories, e.title],
                  }))
                  }
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {e.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                onClick={() => setSortFilter({
                  userName: '',
                  categories: [],
                  reverse: false,
                  search: '',
                })
                }
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
              {filter(goods).length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <p data-cy="NoMatchingMessage">
                      No products matching selected criteria
                    </p>
                  </td>
                </tr>
              ) : (
                filter(goods).map(item => (
                  <tr key={item.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {item.id}
                    </td>
                    <td data-cy="ProductName">{item.name}</td>
                    <td data-cy="ProductCategory">
                      {item.category.icon}
                      {' '}
                      {item.category.title}
                    </td>
                    <td data-cy="ProductUser" className="has-text-link">
                      {item.owner.name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
// export const App = () => {
//   const goods = products.map((product) => {
//     const category = categories.find(e => e.id === product.categoryId);
//     const owner = users.find(user => user.id === category.ownerId);

//     return { ...product, category, owner };
//   });

//   const [state, setState] = useState({
//     usersFilter: '',
//     categorieFilter: [],
//   });

//   function visibleGoods() {
//     function category(item) {
//       if (state.categorieFilter.length === 0) {
//         return true;
//       }

//       // eslint-disable-next-line no-restricted-syntax
//       for (const element of state.categorieFilter) {
//         if (item.category.title === element) {
//           return true;
//         }
//       }

//       return false;
//     }

//     return goods.filter(item => (item.owner.name === (state.usersFilter === ''
//       ? item.owner.name
//       : state.usersFilter) && category(item)));
//   }

//   function setCategorieFilter(categorie) {
//     setState(prevState => ({
//       ...prevState,
//       categorieFilter: [...prevState.categorieFilter, categorie.title],
//     }));
//   }

//   function resetCategorieFilter() {
//     setState(prevState => ({
//       ...prevState,
//       categorieFilter: [],
//     }));
//   }

//   return (
//     <div className="section">
//       <div className="container">
//         <h1 className="title">Product Categories</h1>

//         <div className="block">
//           <nav className="panel">
//             <p className="panel-heading">Filters</p>

//             <p className="panel-tabs has-text-weight-bold">
//               <a
//                 onClick={() => setState(prevState => ({
//                   ...prevState,
//                   usersFilter: '',
//                 }))
//                 }
//                 data-cy="FilterAllUsers"
//                 href="#/"
//                 className={state.usersFilter === '' ? 'is-active' : null}
//               >
//                 All
//               </a>
//               {users.map(user => (
//                 <a
//                   key={user.id}
//                   onClick={() => setState(prevState => ({
//                     ...prevState,
//                     usersFilter: user.name,
//                   }))
//                   }
//                   data-cy="FilterUser"
//                   href="#/"
//                   className={
//                     state.usersFilter === user.name ? 'is-active' : null
//                   }
//                 >
//                   {user.name}
//                 </a>
//               ))}
//             </p>

//             <div className="panel-block">
//               <p className="control has-icons-left has-icons-right">
//                 <input
//                   data-cy="SearchField"
//                   type="text"
//                   className="input"
//                   placeholder="Search"
//                 />

//                 <span className="icon is-left">
//                   <i className="fas fa-search" aria-hidden="true" />
//                 </span>

//                 <span className="icon is-right">
//                   {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//                   <button
//                     data-cy="ClearButton"
//                     type="button"
//                     className="delete"
//                   />
//                 </span>
//               </p>
//             </div>

//             <div className="panel-block is-flex-wrap-wrap">
//               <a
//                 onClick={resetCategorieFilter}
//                 href="#/"
//                 data-cy="AllCategories"
//                 className="button is-success mr-6 is-outlined"
//               >
//                 All
//               </a>
//               {categories.map(categorie => (
//                 <a
//                   data-cy="Category"
//                   onClick={() => setCategorieFilter(categorie)}
//                   className="button mr-2 my-1"
//                   href="#/"
//                 >
//                   {categorie.title}
//                 </a>
//               ))}
//             </div>

//             <div className="panel-block">
//               <a
//                 onClick={() => setState(prevState => ({
//                   ...prevState,
//                   usersFilter: '',
//                 }))
//                 }
//                 data-cy="ResetAllButton"
//                 href="#/"
//                 className="button is-link is-outlined is-fullwidth"
//               >
//                 Reset all filters
//               </a>
//             </div>
//           </nav>
//         </div>

//         <div className="box table-container">
//           <table
//             data-cy="ProductTable"
//             className="table is-striped is-narrow is-fullwidth"
//           >
//             <thead>
//               <tr>
//                 <th>
//                   <span className="is-flex is-flex-wrap-nowrap">
//                     ID
//                     <a href="#/">
//                       <span className="icon">
//                         <i data-cy="SortIcon" className="fas fa-sort" />
//                       </span>
//                     </a>
//                   </span>
//                 </th>

//                 <th>
//                   <span className="is-flex is-flex-wrap-nowrap">
//                     Product
//                     <a href="#/">
//                       <span className="icon">
//                         <i data-cy="SortIcon" className="fas fa-sort-down" />
//                       </span>
//                     </a>
//                   </span>
//                 </th>

//                 <th>
//                   <span className="is-flex is-flex-wrap-nowrap">
//                     Category
//                     <a href="#/">
//                       <span className="icon">
//                         <i data-cy="SortIcon" className="fas fa-sort-up" />
//                       </span>
//                     </a>
//                   </span>
//                 </th>

//                 <th>
//                   <span className="is-flex is-flex-wrap-nowrap">
//                     User
//                     <a href="#/">
//                       <span className="icon">
//                         <i data-cy="SortIcon" className="fas fa-sort" />
//                       </span>
//                     </a>
//                   </span>
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {visibleGoods().map(e => (
//                 <tr key={e.id} data-cy="Product">
//                   <td className="has-text-weight-bold" data-cy="ProductId">
//                     {e.id}
//                   </td>
//                   <td data-cy="ProductName">{e.name}</td>
//                   <td data-cy="ProductCategory">
//                     {e.category.icon}
//                     {' '}
//                     -
//                     {' '}
//                     {e.category.title}
//                   </td>
//                   <td data-cy="ProductUser" className="has-text-link">
//                     {e.owner.name}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
