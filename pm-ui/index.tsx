import "pm-ui/css/fonts.css"
import "pm-ui/css/main.sass"

import * as React from "react"
import * as ReactDOM from "react-dom"

class TestShell extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="appContainer">
        <div className="p-16">
          <div className="frow">
            <div className="col-md-5-6">
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
              <div className="frow">
                <div className="col-md-1-2">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title h5">Apple</div>
                      <div className="card-subtitle text-gray">Hardware and software</div>
                    </div>
                    <div className="card-image">
                      <img className="img-responsive" height={128}
                        src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg" />
                    </div>
                    <div className="card-body">
                      To make a contribution to the world by making tools for the mind that advance humankind.
                    </div>
                    <div className="card-footer">
                      <div className="btn-group btn-group-block">
                        <button className="btn btn-primary">Buy</button>
                        <button className="btn">Buy</button>
                        <button className="btn">Buy</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-1-2">
                  <form className="form-horizontal p-16">
                    <div className="form-group">
                      <div className="col-3 col-sm-12">
                        <label className="form-label" for="input-example-4">Name</label>
                      </div>
                      <div className="col-9 col-sm-12">
                        <input className="form-input" id="input-example-4" type="text" placeholder="Name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-3 col-sm-12">
                        <label className="form-label" for="input-example-5">Email</label>
                      </div>
                      <div className="col-9 col-sm-12">
                        <input className="form-input" id="input-example-5" type="email" placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-3 col-sm-12">
                        <label className="form-label">Gender</label>
                      </div>
                      <div className="col-9 col-sm-12">
                        <label className="form-radio">
                          <input type="radio" name="gender" />
                          <i className="form-icon"></i> Male
                        </label>
                        <label className="form-radio">
                          <input type="radio" name="gender" checked />
                          <i className="form-icon"></i> Female
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-3 col-sm-12">
                        <label className="form-label">Source</label>
                      </div>
                      <div className="col-9 col-sm-12">
                        <select className="form-select" multiple>
                          <option>Slack</option>
                          <option>Skype</option>
                          <option>Hipchat</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-9 col-sm-12 col-ml-auto">
                        <label className="form-switch">
                          <input type="checkbox" />
                          <i className="form-icon"></i> Send me emails with news and tips
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-3 col-sm-12">
                        <label className="form-label" for="input-example-6">Message</label>
                      </div>
                      <div className="col-9 col-sm-12">
                        <textarea className="form-input" id="input-example-6" placeholder="Textarea" rows={3} />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-9 col-sm-12 col-ml-auto">
                        <label className="form-checkbox">
                          <input type="checkbox" /><i className="form-icon"></i> Remember me
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="frow">
            <div className="col-md-5-6">
              <div className="frow">
                <div className="col-md-1-2">
                  <div className="accordion">
                    <input id="accordion-1" type="radio" name="accordion-radio" hidden checked />
                    <label className="accordion-header c-hand" for="accordion-1">
                      <i className="icon icon-arrow-right mr-1"></i>LOLZ
                    </label>
                    <div className="accordion-body">
                      <ul className="menu menu-nav">
                        <li className="menu-item"><a href="#accordions">Element 1</a></li>
                        <li className="menu-item"><a href="#accordions">Element 2</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="accordion">
                    <input id="accordion-2" type="radio" name="accordion-radio" hidden />
                    <label className="accordion-header c-hand" for="accordion-2">
                      <i className="icon icon-arrow-right mr-1"></i>Layout
                    </label>
                    <div className="accordion-body">
                      <ul className="menu menu-nav">
                        <li className="menu-item"><a href="#accordions">Layout 1</a></li>
                        <li className="menu-item"><a href="#accordions">Layout 2</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="accordion">
                    <input id="accordion-3" type="radio" name="accordion-radio" hidden />
                    <label className="accordion-header c-hand" for="accordion-3">
                      <i className="icon icon-arrow-right mr-1"></i>Components
                    </label>
                    <div className="accordion-body">
                      <ul className="menu menu-nav">
                        <li className="menu-item"><a href="#accordions">Component 1</a></li>
                        <li className="menu-item"><a href="#accordions">Component 2</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-1-2">
                  <div className="frow">
                    <div className="col-md-1-3">
                      <button className="btn badge" data-badge="">Button</button>
                      <button className="btn badge" data-badge="8">Button</button>
                    </div>
                    <div className="col-md-1-3">
                      <button className="btn btn-primary badge" data-badge="">Button</button>
                      <button className="btn btn-primary badge" data-badge="8">Button</button>
                    </div>
                    <div className="col-md-1-3">
                      <figure className="avatar avatar-xl badge" data-badge="8" data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="YZ"/>
                      </figure>
                      <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="YZ"/>
                      </figure>
                      <figure className="avatar badge" data-badge="8" data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="YZ"/>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<TestShell />, document.body)
