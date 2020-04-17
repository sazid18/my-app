import React, {Component, useState, useEffect } from "react";
import {InfoWindow, Marker, Polygon, GoogleApiWrapper,Map} from "google-maps-react";
import {ggnSample} from "./sample";


class ClusterVizRender2 extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedCluster : {},
        ggnData:[],
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        triangleCoords : [
            { lat: 28.4595, lng: 77.0266 },
            { lat: 26.4595, lng: 76.0266 },
            { lat: 30.4595, lng: 78.0266 }
        ]
    }
    // var mapStyles = {
    //     width: '100%',
    //     height: '100%'
    // };

    componentDidMount(){
        for (const [key, value] of Object.entries(ggnSample)) {
            this.state.ggnData.push({
                ...value,
                "id":key
            })
        }
    }

    // useEffect(() => {
    //     const listener = e => {
    //         if (e.key === "Escape") {
    //             // setSelectedPark(null);
    //         }
    //     };
    //     window.addEventListener("keydown", listener);
    //
    //     return () => {
    //         window.removeEventListener("keydown", listener);
    //     };
    // }, []);

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedCluster: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    arrMinMaxAvg (arr) {
        return (Math.min(...arr) + Math.max(...arr)) / 2;
    }

    setSelectedCluster(cluster){
        this.setState({SelectedCluster:cluster})
    }

    render(){
        return(
            <Map
                google={this.props.google}
                initialCenter={{ lat: 28.4595, lng: 77.0266 }}
                defaultOptions={{ styles: null }}
                zoom={ this.props.zoom }
                style={{width: '100%',
                    height: '100%'}}
            >

                {
                    this.state.ggnData &&
                    this.state.ggnData.map((item,i) =>{
                        return(
                        <Polygon
                            path={item.locations.map(x =>  {return {"lat":x.latitude,"lng":x.longitude}})}
                            key={"cluster_"+i}
                            editable={false}
                            options={{
                                strokeColor: item.color,
                                strokeOpacity: 0,
                                strokeWeight: 0,
                                fillColor: item.color,
                                fillOpacity: 0.35
                            }}
                            //onClick={this.setSelectedCluster(item)}
                            // onClick={() => {
                            //     this.setState({selectedCluster: item})
                            // }}
                        />);}
                    )
                }

                {/*{ this.state.selectedCluster &&*/}
                {/*    <InfoWindow*/}
                {/*        marker={this.state.activeMarker}*/}
                {/*        visible={this.state.showingInfoWindow}*/}
                {/*        onClose={this.onClose}*/}
                {/*        // onCloseClick={() => {*/}
                {/*        //     this.setState({selectedCluster: null})*/}
                {/*        // }}*/}
                {/*        position={{*/}
                {/*            lat: this.arrMinMaxAvg(this.state.selectedCluster.locations.map(x => x.latitude)),*/}
                {/*            lng: this.arrMinMaxAvg(this.state.selectedCluster.locations.map(x =>  x.longitude))*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <div>*/}

                {/*            <h2>{this.state.selectedCluster.cluster_id}</h2>*/}
                {/*            <h3>{`Details:`}</h3>*/}
                {/*            <p>*/}
                {/*                {`ARR: ${this.state.selectedCluster.details.ARR} ,*/}
                {/*                REVPAR: ${this.state.selectedCluster.details.REVPAR} ,*/}
                {/*                Area: ${this.state.selectedCluster.details.Area} ,*/}
                {/*                No of properties: ${this.state.selectedCluster.details.No_of_prop}`*/}
                {/*                }*/}
                {/*            </p>*/}

                {/*        </div>*/}
                {/*    </InfoWindow>*/}
                {/*}*/}

            </Map>
        );
    }

}
export default GoogleApiWrapper({
    apiKey: ''
})(ClusterVizRender2);
