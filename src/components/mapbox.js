import React from 'react';
import datastore from './data-store/datastore_search010122.json'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// here import leaflet
mapboxgl.accessToken = 'pk.eyJ1IjoiY3luZG9yaWlsIiwiYSI6ImNsMmdkOHJjNDAyeDkzY3RweXByMGMzdHUifQ.H9YF8U8xrdikPIWH8SSUig';


export default class MapboxComponent extends React.PureComponent {
    constructor(props) {
    super(props);

    this.state = {
        valueInput: 0,
        valueSearch: 0,
        lng: 12.4621,
        lat: 41.8772,
        zoom: 9.24,
        geoJson : datastore.map(obj => { return {
            "Denominazione": obj.denominazione,
            "Via": obj.via + " " + obj.civico + " - Roma",
            "Latitude": obj.latitude,
            "Longitude": obj.longitude,
            "coordinates": [obj.longitude, obj.latitude],
            "Contatti" : {
                "Telefono": obj.contattoTelefono,
                "Email": obj.contattoEmail,
                "WebSite": obj.contattoWebSite
            },
            "totalePostiLetto" : obj.totalePostiLetto,
            "totaleNumeroCamere": obj.totaleNumeroCamere
        }}),
        infobox: 0
    };

    this.mapContainer = React.createRef();
    this.valueSearchHandler = this.valueSearchHandler.bind(this)
    this.infoRenderer = this.infoRenderer.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/cyndoriil/cl2iz4b20000614pdt44tt477',
            center: [lng, lat],
            zoom: zoom
        });
        
        this.state.geoJson.map((coord, i) =>{ 
        const el = document.createElement("div");
        el.className="marker"
        return new mapboxgl.Marker(el)
        .setLngLat(coord.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<div id="popup"><h3>ID: ${i}</h3><h3 id="popup-h3">${coord.Denominazione}</h3><p id="popup-p">${coord.Via}</p></div>`)
        )
        .addTo(map)});
        
        

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.addControl(new mapboxgl.FullscreenControl(map));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.valueInput < 0) {
            this.setState({valueSearch: 0})
        } else if (this.state.valueInput > this.state.geoJson.length -1) {
            this.setState({valueSearch : this.state.geoJson.length -1})
        } else {
            this.setState({valueSearch : this.state.valueInput})          
        }
    }
    valueSearchHandler = (e) => {
        e.preventDefault();
        this.setState({valueSearch : e.target.value})
        }

    valueInputHandler = (e) => {
        this.setState({valueInput: e.target.value})
    }

    infoRenderer = () => {       
            return(
                <div className='interactive-div'>
                    <h3>ID : {this.state.valueSearch}</h3>
                    <h2>{this.state.geoJson[this.state.valueSearch].Denominazione}</h2>
                    <p>{this.state.geoJson[this.state.valueSearch].Via}</p>
                    <p>Latitude: {this.state.geoJson[this.state.valueSearch].Latitude}</p>
                    <p>Longitude: {this.state.geoJson[this.state.valueSearch].Longitude}</p>
                    <br/>
                    <p>Totale posti letto: {this.state.geoJson[this.state.valueSearch].totalePostiLetto}</p>
                    <p>Totale numero camere: {this.state.geoJson[this.state.valueSearch].totaleNumeroCamere}</p>
                    <br/>
                    <h3>Contatti :</h3>
                    <p>Numero di Telefono: {this.state.geoJson[this.state.valueSearch].Contatti.Telefono}</p>
                    <p>Contatto Email: {this.state.geoJson[this.state.valueSearch].Contatti.Email}</p>
                    <p>Sito Web: {this.state.geoJson[this.state.valueSearch].Contatti.WebSite}</p>
                </div>
            )
    }

    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div className='container-home'>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />

                <div className='search-by-id-form'>
                    <form onSubmit={this.onSubmit}>
                    <input type="number"
                            className='input-form'
                            onChange={this.valueInputHandler}
                            required/>
                    <input type="submit" value="Search" className="form-btn" />
                    </form>
                    <div>
                        {this.infoRenderer()}
                    </div>
                </div>
            </div>       
        )
    }
};
