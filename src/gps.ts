interface Coords {
  lat: number;
  lon: number;
}
const radians = (degrees: number): number => degrees * Math.PI / 180;
/**
 * retrieve the distance betzeen two point using GPS coordinates 
 * and the result unit is Kilometers
 * 
 */
const getDistanceOf = (from: Coords, to: Coords): number => { 
  const { acos, cos, sin, } = Math;
  const { lat, lon } = from;
  return 6371 * acos(cos(radians(lat)) * cos(radians(to.lat)) * cos(radians(to.lon) - radians(lon)) + sin(radians(lat)) * sin(radians(to.lat)));
}

const classes = [
  {
      "lat": 25.32198692137065,
      "lng": 51.526270508766174
  },
  {
      "lat": 25.38677156201646,
      "lng": 51.526106894016266
  },
  {
      "lat": 25.240223320951856,
      "lng": 51.457792297969945
  },
  {
      "lat": 25.26605781329848,
      "lng": 51.5086430311203
  },
];
const userLat = 25.08852120264773;  // 25.395946658727652;
const userLng = 51.435039192438126; //51.514295786619186;

/**
 * order by nearest location to user using gps coordinates
 */
const classesDistance = classes.sort( (a, b) => {
  const _distanceA = getDistanceOf({lat: userLat, lon: userLng}, {lat: a.lat, lon: a.lng});
  const _distanceB = getDistanceOf({lat: userLat, lon: userLng}, {lat: b.lat, lon: b.lng});
  
  // console.log(_distanceA, _distanceB);
  return _distanceA - _distanceB;
});

console.log(
  // distance between two location
  getDistanceOf({lat: 25.08852120264773, lon: 51.435039192438126}, {
    lat: 25.26605781329848,
    lon: 51.5086430311203,
  }) + 'Km',
  // order by the near location to {lat: 25.08852120264773, lon: 51.435039192438126}
  classesDistance
);