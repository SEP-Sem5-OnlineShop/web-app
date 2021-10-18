import React, {useEffect} from "react"
import {Loader} from "@googlemaps/js-api-loader";
import {useSelector} from "react-redux";

export default function DriverMap() {
    const loader = new Loader({
        apiKey: "AIzaSyBo-7VdOVmwdviU_GNBfkmEN63Wfn1dvvs",
        version: "weekly",
        libraries: ["places"]
    });
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

                new google.maps.Marker({
                    position: latitudeLongitude,
                    map: map
                })

                Object.values(customers).forEach(driver => {
                    const driverLatLng = driver.location['coordinates']
                    console.log(driverLatLng)
                    new google.maps.Marker({
                        position: {lat: parseFloat(driverLatLng[0]), lng: parseFloat(driverLatLng[1])},
                        map: map
                    })
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