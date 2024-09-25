const axios = require("axios");

exports.getFlights = async function (req, res) {
  try {
    // api kısmından flight bilgilerini alıyoruz.
    const flightResponse = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      {
        headers: {
          ResourceVersion: "v4",
          app_id: process.env.API_ID,
          app_key: process.env.API_KEY,
          Accept: "application/json",
        },
      }
    );

    const flights = await Promise.all(
      flightResponse.data.flights.map(async (flight) => {
        const destinations = flight.route.destinations; // Destinations array
        const stops = flight.codeshares; // Son varış noktası hariç durak sayısı

        let departure = {}; // kalkış bilgileri
        let arrival = {}; // varış bilgileri
        let depCountry = ""; // kalkış yapılan ülke
        let arrCountry = ""; // varış yapılan ülke

        // varış yaptığı yerin code bilgisine göre ilgilili bilgileri güncelliyoruz.
        switch (flight.route.destinations[0]) {
          case "LCA":
            depCountry = "Kıbrıs";
            arrCountry = "Kıbrıs";
            break;
          case "OPO":
            depCountry = "Portekiz";
            arrCountry = "Portekiz";
            break;
          case "BCN":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "AGP":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "FAO":
            depCountry = "Portekiz";
            arrCountry = "Portekiz";
            break;
          case "RHO":
            depCountry = "Yunanistan";
            arrCountry = "Yunanistan";
            break;
          case "AYT":
            depCountry = "Türkiye";
            arrCountry = "Türkiye";
            break;
          case "GRO":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "RAK":
            depCountry = "Fas";
            arrCountry = "Fas";
            break;
          case "KEF":
            depCountry = "İzlanda";
            arrCountry = "İzlanda";
            break;
          case "VLC":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "PMI":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "SPU":
            depCountry = "Hırvatistan";
            arrCountry = "Hırvatistan";
            break;
          case "HER":
            depCountry = "Yunanistan";
            arrCountry = "Yunanistan";
            break;
          case "DLM":
            depCountry = "Türkiye";
            arrCountry = "Türkiye";
            break;
          case "BJV":
            depCountry = "Türkiye";
            arrCountry = "Türkiye";
            break;
          case "PFO":
            depCountry = "Kıbrıs";
            arrCountry = "Kıbrıs";
            break;
          case "NCE":
            depCountry = "Fransa";
            arrCountry = "Fransa";
            break;
          case "MIA":
            depCountry = "ABD";
            arrCountry = "ABD";
            break;
          case "BOG":
            depCountry = "Kolombiya";
            arrCountry = "Kolombiya";
            break;
          case "LIS":
            depCountry = "Portekiz";
            arrCountry = "Portekiz";
            break;
          case "BRI":
            depCountry = "İtalya";
            arrCountry = "İtalya";
            break;
          case "IBZ":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          case "MJT":
            depCountry = "Yunanistan";
            arrCountry = "Yunanistan";
            break;
          case "CTA":
            depCountry = "İtalya";
            arrCountry = "İtalya";
            break;
          case "LPA":
            depCountry = "İspanya";
            arrCountry = "İspanya";
            break;
          default:
            depCountry = "Hollanda";
            arrCountry = "Hollanda";
            break;
        }

        // uçak yönünün kalkış yada varış ılma durumuna göre belirli bilgileri api dan alarak içerine ekliyoruz.
        if (flight.flightDirection === "D") {
          // Uçuş kalkış uçuşu (departure)
          departure = {
            airportCode: "AMS", // İlk destinasyon kalkış havaalanı
            depCountry: (depCountry = "Hollanda"),
            scheduleDate: flight.scheduleDate,
            scheduleTime: typeof flight.scheduleTime === "string" ? flight.scheduleTime.slice(0, 5) : "",
            terminal: flight.terminal,
          };
          arrival = {
            airportCode: destinations[destinations.length - 1], // Son destinasyon varış havaalanı
            arrCountry,
            actualLandingDate: typeof flight.actualLandingTime === "string" ? flight.actualLandingTime.slice(0, 10) : "",
            actualLandingTime: typeof flight.actualLandingTime === "string" ? flight.actualLandingTime.slice(11, 16) : "",
            terminal: flight.terminal,
          };
        } else if (flight.flightDirection === "A") {
          // Uçuş varış uçuşu (arrival)
          arrival = {
            airportCode: "AMS", // İlk destinasyon varış havaalanı
            arrCountry: (arrCountry = "Hollanda"),
            scheduleDate: flight.scheduleDate,
            scheduleTime: typeof flight.scheduleTime === "string" ? flight.scheduleTime.slice(0, 5) : "",
            terminal: flight.terminal,
          };
          departure = {
            airportCode: destinations[destinations.length - 1], // Son destinasyon kalkış havaalanı
            depCountry,
            actualLandingDate: typeof flight.actualLandingTime === "string" ? flight.actualLandingTime.slice(0, 10) : "",
            actualLandingTime: typeof flight.actualLandingTime === "string" ? flight.actualLandingTime.slice(11, 16) : "",
            terminal: flight.terminal,
          };
        }

        return {
          flightId: flight.id, // Uçuş ID'si
          flightNumber: flight.flightNumber, // Uçuş numarası
          flightName: flight.flightName,
          airline: flight.prefixICAO,
          airlineCode: flight.airlineCode,
          departure: departure,
          arrival: arrival,
          stops: stops,
          price: calculatePrice(stops),
          aircraftType: flight.aircraftType,
        };
      })
    );

    res.json({ flights });
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({ message: "Error fetching flights data" });
  }
};

// Fiyat hesaplama
function calculatePrice(stops) {
  return stops === 0 ? "$200" : "$230"; // Basit fiyat hesaplaması
}

exports.getFlightById = async function (req, res) {
  const { id } = req.params;

  try {
    const flightResponse = await axios.get(
      `https://api.schiphol.nl/public-flights/flights/${id}`,
      {
        headers: {
          ResourceVersion: "v4",
          app_id: process.env.API_ID,
          app_key: process.env.API_KEY,
          Accept: "application/json",
        },
      }
    );
    res.json(flightResponse.data);
  } catch (error) {
    console.error("Error fetching flight by ID:", error.message);
    res.status(500).json({ message: "Error fetching flight data by ID" });
  }
};
