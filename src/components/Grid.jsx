import React from 'react';
import '../styles/grid.css';

const Grid = (props) => {

  //Getting needed data for building grid with the items of the selected section
  const getLayaoutForSection = (sections, items, selectedMenu, language) => {
    if (selectedMenu === 'main') return false;

    const gridLayoutData = [];

    sections[selectedMenu].options.forEach((item) => {
      const gridItemData = [];

      //Check if item id is avaiable on items data
      if (item._ref in items) {
        gridItemData['key'] = items[item._ref]._id;
        gridItemData['image'] = "http://localhost:3000/images/" + items[item._ref].image.asset._ref;
        gridItemData['name'] = items[item._ref].name[language];

        gridLayoutData.push(gridItemData)
      }
    })

    return gridLayoutData;
  }

  //Function to chunk array into 3 for building the grid 3 columns 1 item per column
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  const gridLayoutData = getLayaoutForSection(props.sections, props.items, props.selectedMenu, props.language) || props.mainMenu;

  const renderGrid = (layoutData) => {
      const gridLayout = arrayChunk(layoutData, 3);

      return gridLayout.map((row, i) => {
        return (
          <div key={i} className="row mx-auto grid mt-4">
            {row.map((item) => {
              return (
                <div className="col-md mb-3 d-flex align-items-stretch" key={item.key}>
                  <div className="card" style={{ width: "13rem" }}>
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <span className="material-symbols-outlined float-right">
                        arrow_circle_right
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })
  }

  return (
    <div className='gridContainer'>
      {renderGrid(gridLayoutData)}
    </div>
    
  )
}


export default Grid;

