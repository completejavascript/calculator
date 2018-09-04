import React from 'react';
import './History.css';


function isOverflowedX(element) {
  return element.scrollWidth > element.clientWidth;
}

function isOverflowedY(element) {
  return element.scrollHeight > element.clientHeight;
}

function addScrollbarIfNeeded(element) {
  if (isOverflowedY(element)) element.style.overflowY = "scroll";
  else element.style.overflowY = "initial";

  if (isOverflowedX(element)) element.style.overflowX = "scroll";
  else element.style.overflowX = "initial";
}

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.historyList = React.createRef();
  }

  componentDidUpdate() {
    addScrollbarIfNeeded(this.historyList.current);
  }

  render() {
    const historyClassName = this.props.isShowHistory ? "history" : "history hidden";

    return (
      <div className={historyClassName}>
        <div className="history-list" ref={this.historyList}>
          {
            this.props.history.map((item, index) => {
              return (
                <div key={index} className="history-item">
                  <div className="history-item-formula">{item.formula.join("")}</div>
                  <div className="history-item-result" value={item.result} onClick={this.props.onHistoryItemClicked}>={item.result}</div>
                  <hr></hr>
                </div>
              )
            })
          }
        </div>
        <div className="bottom-btns">
          <button id="clear-history" onClick={this.props.onClearHistory}>Clear</button>
          <button id="calculate" onClick={this.props.onEqual}>Equal</button>
        </div>
      </div>
    )
  }
}