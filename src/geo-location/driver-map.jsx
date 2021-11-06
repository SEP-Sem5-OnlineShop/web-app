import React, {useEffect} from "react"
import {driverApi} from "../api";
import {Loader} from "@googlemaps/js-api-loader";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../store";
import {getFileUrl} from "../api/azure-storage-blob";

export default function DriverMap() {
    const loader = new Loader({
        apiKey: "AIzaSyBo-7VdOVmwdviU_GNBfkmEN63Wfn1dvvs",
        version: "weekly",
        libraries: ["places"]
    });
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const location = useSelector(state => state.user.userData.location)
    const customers = useSelector(state => state.map.alertedCustomers)

    useEffect(async () => {
        // Initialize and add the map
        let map
        let latitudeLongitude = {lat: parseFloat(location['coordinates'][0]), lng: parseFloat(location['coordinates'][1])}
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitudeLongitude = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                })
        }

        const mapOptions = {
            center: latitudeLongitude,
            zoom: 15,
        }


        loader.load()
            .then(google => {
                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                const distanceMatrixService = new google.maps.DistanceMatrixService()
                const origin = new google.maps.LatLng(latitudeLongitude.lat, latitudeLongitude.lng)

                const marker = new google.maps.Marker({
                    position: latitudeLongitude,
                    map: map,
                    icon: "https://img.icons8.com/color/48/000000/truck--v2.png"
                })

                const updateMarkerWindow = (origin, destination, marker) => {
                    let infoWindow;
                    distanceMatrixService.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'DRIVING',
                        }, (response, status) => {
                            const result = response.rows[0].elements[0]
                            marker.setMap(map)
                            if(result && result.duration) {
                                infoWindow = new google.maps.InfoWindow({
                                    content: `
                                        <div class="ml-2 flex flex-col">
                                            <span class="text-sm">Time to go ${result.duration.text}</span>
                                            <span class="text-sm">${result.distance.text} ahead</span>
                                        </div>
                                    `,
                                });
                            }
                        });
                    marker.addListener('mouseover', function() {
                        infoWindow ? infoWindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        }) : (() => {})()
                    });
                    marker.addListener('mouseout', function() {
                        infoWindow ? infoWindow.close() :  (() => {})()
                    });
                }

                const setMarker = (origin) => {
                    Object.values(customers).forEach(customer => {
                        const driverLatLng = customer.location['coordinates']
                        const marker = new google.maps.Marker({
                            position: {lat: parseFloat(driverLatLng[0]), lng: parseFloat(driverLatLng[1])},
                            map: map,
                            icon: "https://img.icons8.com/plasticine/100/000000/user-location.png",
                            size: 18
                        })
                        const destination = new google.maps.LatLng(driverLatLng[0], driverLatLng[1])
                        updateMarkerWindow(origin, destination, marker)
                    })
                }

                setMarker(origin)
                map.addListener("click", async mapsMouseEvent => {
                    const latLng = mapsMouseEvent.latLng.toJSON()
                    dispatch(actions.user.setUserData({...userData, location: {type: "Point", coordinates: [latLng.lat, latLng.lng]}}))
                    try {
                        const result = await driverApi.updateDriverLocation({coordinates: [latLng.lat, latLng.lng]})
                        if(result.data && result.status === 200) {
                            const position = new google.maps.LatLng(latLng.lat, latLng.lng)
                            marker.setPosition(position)
                            const origin = new google.maps.LatLng(latLng.lat, latLng.lng)
                            setMarker(origin)
                        }
                    }
                    catch (e) {

                    }
                })
                //
                // const geocoder = new google.maps.Geocoder()
                // geocoder.geocode({location: latitudeLongitude})
                //     .then(response => {
                //         console.log(response.results)
                //     })

            })
            .catch(e => {
                console.log(e)
            })

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }

        return () => {

        }

    }, [customers])

    return (
        <div id='map' className="w-full" style={{ minHeight: 'calc(100vh - 7rem)' }} />
    )
}