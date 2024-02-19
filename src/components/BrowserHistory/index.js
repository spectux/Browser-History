import {Component} from 'react'
import './index.css'

class BrowserHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      historyList: props.initialHistoryList,
    }
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteHistoryItem = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(item => item.id !== id),
    }))
  }

  render() {
    const {searchInput, historyList} = this.state

    const filteredHistoryList = historyList.filter(historyItem =>
      historyItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="browser-history-container">
        <div className="search-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/search-img.png"
            alt="search"
            className="search-icon"
          />
          <input
            type="search"
            value={searchInput}
            onChange={this.updateSearchInput}
            placeholder="Search history"
            className="search-input"
          />
        </div>
        <ul className="history-list">
          {filteredHistoryList.length > 0 ? (
            filteredHistoryList.map(historyItem => (
              <li key={historyItem.id} className="history-item">
                <div className="history-info">
                  <img
                    src={historyItem.logoUrl}
                    alt="domain logo"
                    className="domain-logo"
                  />
                  <div>
                    <p className="time-accessed">{historyItem.timeAccessed}</p>
                    <p className="title">{historyItem.title}</p>
                    <p className="domain-url">{historyItem.domainUrl}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => this.deleteHistoryItem(historyItem.id)}
                  data-testid="delete"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                    alt="delete"
                    className="delete-icon"
                  />
                </button>
              </li>
            ))
          ) : (
            <li className="empty-history">
              <p>There is no history to show</p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BrowserHistory
