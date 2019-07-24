import React from 'react';
import Item from '../Item';

import './styles.css';

export default class Playlist extends React.Component {
	state = { playlist: [] };

	static formatTime(milisecs) {
		return new Date(+milisecs).toISOString().substr(14, 5);
	}

	componentDidMount() {
		fetch('/data/playlist.json')
			.then(res => res.json())
			.then(
				result => {
					this.setState({ playlist: result.playlist });
				},
				error => console.log(error)
			);
	}

	render() {
		return (
			<section className="playlist">
				<div className="playlist_list _playlist">
					{this.state.playlist.map(item => {
						return (
							<Item
								song={`${item.track} - ${item.author}`}
								duration={Playlist.formatTime(item.duration)}
							/>
						);
					})}
				</div>
			</section>
		);
	}
}
