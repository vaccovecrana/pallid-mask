import * as React from "react"

export default class PmNavBar extends React.Component {
  public render() {
    return (
      <div className="frow">
        <div className="col-md-1-1">
          <div className="mb-25">
            <header className="navbar">
              <section className="navbar-section">
                <a className="navbar-brand text-bold mr-2" href="#navbar">PALLID-MASK</a>
                <a className="btn btn-link" href="#navbar">Docs</a>
                <a className="btn btn-link" href="https://github.com/picturepan2/spectre">GitHub</a>
              </section>
              <section className="navbar-section">
                <div className="input-group input-inline">
                  <input className="form-input" type="text" placeholder="search"/>
                  <button className="btn btn-primary input-group-btn">Search</button>
                </div>
              </section>
            </header>
          </div>
        </div>
      </div>
    )
  }
}
