import React from "react";

import $ from 'jquery';

// Tab view component.
// Currently, this component is only supported once on a single page.
class Tabs extends React.Component {

	// Tab button.
	// This button is shown at the top of the tab view, and can be used
	// to switch between tabs.
	static TabButton = class extends React.Component {

		constructor(props) {
			super(props);
		}

		onClick() {
			$('.tab').css("display", "none");
			$(this.props.target).css("display", "block");
		}

		render() {
			return (
				<div className="tab-button" onClick={() => this.onClick()}>
					{this.props.children}
				</div>
			);
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			currentTab: "#"
		};
	}

	componentDidMount() {
		$('.tab').css("display", "none");
		$(this.props.defaultTab).css("display", "block");
	}

	render() {

		return (
			<div className="tabs">
				{this.props.children}
			</div>
		);
	}
}

export default Tabs;