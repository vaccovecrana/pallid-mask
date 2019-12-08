import * as React from "react"

import * as appMeta from "../../package.json"

export default class PmNavBar extends React.Component {
  public render() {
    return (
      <div className="frow">
        <div className="col-md-1-1">
          <div className="mb-25">
            <header className="navbar">
              <section className="navbar-section">
                <a className="navbar-brand text-bold mr-2" href="#navbar">PALLID-MASK</a>
                <a className="btn btn-link" href="https://github.com/vaccovecrana/pallid-mask">GitHub</a>
              </section>
              <section className="navbar-section">
                <small>
                  <pre>
                    v{process.env.NODE_ENV === "development" ? 999 : appMeta.version}
                  </pre>
                </small>
              </section>
            </header>
          </div>
        </div>
      </div>
    )
  }
}
