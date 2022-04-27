import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./navigation/nav";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio-items/portfolio-detail";
import WrongLink from "./pages/wrong-link";

export default class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="app">
				<Router>
					<div>
						<Navigation />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/about" component={About} />
							<Route path="/contact" component={Contact} />
							<Route path="/blog" component={Blog} />
							<Route
								exact
								path="/detail/:slug"
								component={PortfolioDetail}
							/>
							<Route component={WrongLink} />
						</Switch>
					</div>
				</Router>

				<h2>The March 7 2022 Class is Awesome!</h2>
			</div>
		);
	}
}
