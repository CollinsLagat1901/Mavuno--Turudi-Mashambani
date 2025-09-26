'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, LocateFixed } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: -0.3031,
  lng: 36.08,
};

interface MapPickerProps {
  onLocationChange: (lat: number, lng: number, county: string, subCounty: string | null) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onLocationChange }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'geocoding'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const reverseGeocode = useCallback((latLng: google.maps.LatLng) => {
    if (!isLoaded) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        let county = '';
        let subCounty = null;
        for (const component of results[0].address_components) {
          if (component.types.includes('administrative_area_level_1')) {
            county = component.long_name.replace(' County', '');
          }
          if (component.types.includes('locality') || component.types.includes('sublocality')) {
             subCounty = component.long_name;
          }
        }
        onLocationChange(latLng.lat(), latLng.lng(), county, subCounty);
      }
    });
  }, [isLoaded, onLocationChange]);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPos = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setMarkerPosition(newPos);
      reverseGeocode(event.latLng);
    }
  }, [reverseGeocode]);

  const handleMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newPos = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setMarkerPosition(newPos);
        reverseGeocode(event.latLng);
      }
    },
    [reverseGeocode]
  );

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const newPos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newPos);
        map?.panTo(newPos);
        map?.setZoom(15);
        reverseGeocode(place.geometry.location);
      }
    }
  };

  const panToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(newPos);
        map?.panTo(newPos);
        map?.setZoom(15);
        if(isLoaded){
          reverseGeocode(new window.google.maps.LatLng(newPos.lat, newPos.lng));
        }
      });
    }
  };
  
  useEffect(() => {
    if (isLoaded) {
      // Set initial location on load
      reverseGeocode(new window.google.maps.LatLng(defaultCenter.lat, defaultCenter.lng));
    }
  }, [isLoaded, reverseGeocode]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div className="flex items-center justify-center h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <p className="ml-2">Loading Map...</p></div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Autocomplete
          onLoad={(ac) => setAutocomplete(ac)}
          onPlaceChanged={onPlaceChanged}
          className="w-full"
        >
          <Input type="text" placeholder="Search for a location" />
        </Autocomplete>
        <Button type="button" variant="outline" size="icon" onClick={panToCurrentLocation} aria-label="Use current location">
            <LocateFixed />
        </Button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
        onLoad={(map) => setMap(map)}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default MapPicker;
