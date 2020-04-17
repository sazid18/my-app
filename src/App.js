import React, {Component} from 'react';
import ClusterVizRender2 from "./ClusterVizRender2";

export default class ClusterVizScreen extends Component {

    render() {
        return (
            <div style={{ width: "100vw", height: "100vh" }}>
                <ClusterVizRender2
                    google={this.props.google}
                    height='300px'
                    zoom={12}
                    center={{ lat: 28.4595, lng: 77.0266 }}
                />
            </div>
        );
    }
}





