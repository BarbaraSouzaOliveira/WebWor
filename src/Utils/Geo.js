const rEarth = 6378

export function addKmToGeo (lat, lng, horizontal = 10, vertical = horizontal) {
  return [
    lat + (horizontal / rEarth) * (180 / Math.PI),
    lng + (vertical / rEarth) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180),
  ]
}

export function distance (lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0
  }
  const radlat1 = Math.PI * lat1 / 180
  const radlat2 = Math.PI * lat2 / 180
  const theta = lon1 - lon2
  const radtheta = Math.PI * theta / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344
  return dist

}
