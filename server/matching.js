
  // -- BEGIN OF ROUTE MATCHING --
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // SAMPLE QUERY
  // {
  //   'pickup': {
  //     'city': 'Cambridge',
  //     'lat': 43.4434036, 
  //     'lon': -80.3090553
  //   },
  //   'dropoff': {
  //     'city': 'Mississauga',
  //     'lat': 43.5929203, 
  //     'lon': -79.6452374
  //   },
  //   'time': 1479601047,
  //   'qid': 1
  // }

  // SAMPLE TRIPS
  // [
  //   {
  //     'pickup': {
  //       'city': 'Cambridge',
  //       'lat': 43.4434036,
  //       'lon': -80.3090553
  //     },
  //     'dropoff': {
  //       'city': 'Mississauga',
  //       'lat': 43.5929203,
  //       'lon': -79.6452374
  //     },
  //     'time': 1479601047,
  //     'id':1
  //   },
  //   {
  //     'pickup': {
  //       'city': 'Cambridge',
  //       'lat': 43.4234036,
  //       'lon': -80.3090553
  //     },
  //     'dropoff': {
  //       'city': 'Mississauga',
  //       'lat': 43.5929203,
  //       'lon': -79.6452374
  //     },
  //     'time': 1479601047,
  //     'id':2
  //   },
  //   {
  //     'pickup': {
  //       'city': 'Cambridge',
  //       'lat': 43.4134036,
  //       'lon': -80.3090553
  //     },
  //     'dropoff': {
  //       'city': 'Mississauga',
  //       'lat': 43.5929203,
  //       'lon': -79.6452374
  //     },
  //     'time': 1479601047,
  //     'id':3
  //   }
  // ];

  // sub function of findMatches that runs for just a single query, returns an array
  function findQueryMatch (query, trips) {
    var matches = [];
    for (var t = 0; t < trips.length; t++) {
      if (query.pickup.city == trips[t].pickup.city &&    // start the same city
          query.dropoff.city == trips[t].dropoff.city &&  // to the same city
          Math.abs(query.time - trips[t].time) < (1000 * 60 * 60)) { // within 1 hour or request
        // calculate the distance
        var totalDistance = getDistanceFromLatLonInKm(query.pickup.lat, query.pickup.lon, trips[t].pickup.lat, trips[t].pickup.lon) +
          getDistanceFromLatLonInKm(query.dropoff.lat, query.dropoff.lon, trips[t].dropoff.lat, trips[t].dropoff.lon);

        var match = {
          'id': trips[t].id,
          'dist': totalDistance
        };

        // limit to a maximum of 10 km deviation, then insert
        if (totalDistance > 10) {
          continue;
        }

        // corner case of empty array
        if (matches.length == 0) {
          matches.push(match);
          continue;
        }

        // insert into array one that fits well
        for (var idx = 0; idx < matches.length; idx++) {
          if (matches[idx] >= totalDistance) {
            matches.splice(idx, 0, match);
            break;
          } else if (idx == matches.length-1) {
            matches.splice(idx+1, 0, match);
            break;
          }
        }

        // remove any if exceeded 20 matches
        if (matches.length > 20) {
          matches.splice(20, 1);
        }
      }
    }
    return matches;
  }

  // This is the searching logic, I stubbed out all the actual DB calls because I don't know
  // how to call them. This function should be called whenever there's a new update to the
  // query table, or to the trips table. This function will return an array of matches.

  // queries is a JSON array of type queries
  // trips is a JSON array of trips
  function findAllMatches (queries, trips) {
    var matches = {};
    for (var q = 0; q < queries.length; q++) {
      matches[queries[q]['qid'].toString()] = findQueryMatch(queries[q], trips);
    }
    return matches;
    // returns, a JSON hashed queryID linked with up to 20 tripID's
    // {
    //   '321321': [3213,3213,23213,21321,312,3213,123],
    //   '2311': [2,32,23,3,13,21,312,321,23] 
    // }
  }
  // -- END OF ROUTE MATCHING --