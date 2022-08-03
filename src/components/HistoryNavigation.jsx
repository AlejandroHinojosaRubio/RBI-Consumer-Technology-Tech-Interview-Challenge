import React from "react";
import '../styles/historyNavigation.css';

const HistoryNavigation = (props) => {
    
    //Handler for browse into menus history
    const handleBrowseHistory = (e) => {
        let currentPosition = props.menuHistoryPosition;

        if (e.currentTarget.id === 'next') {
            currentPosition++;
            
            //We don't want to get out of the history length
            if (currentPosition > props.menuHistory.length - 1) currentPosition--;

        } else if (e.currentTarget.id === 'previus') {
            currentPosition--;

            //We don't want to get out of the history length
            if (currentPosition < 0) currentPosition = 0;
        }

        props.onBrowseHistory(props.menuHistory[currentPosition], currentPosition);
    }

    return (
        <div>
            <div className="fixed-bottom p-3">
                <span className="material-icons md-48" onClick={handleBrowseHistory} id="previus">
                    arrow_circle_left
                </span>
                <div className="bottom-right p-3">
                    <span className="material-icons md-48" onClick={handleBrowseHistory} id="next">
                        arrow_circle_right
                    </span>
                </div>
            </div>

        </div>
    )
}

export default HistoryNavigation;
