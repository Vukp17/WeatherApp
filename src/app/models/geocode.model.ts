export class GeocodeData {
    results: {
      addressComponents: {
        longName: string;
        shortName: string;
        types: string[];
      }[];
      formattedAddress: string;
      geometry: {
        bounds: {
          northeast: {
            lat: number;
            lng: number;
          },
          southwest: {
            lat: number;
            lng: number;
          }
        },
        location: {
          lat: number;
          lng: number;
        },
        locationType: string;
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          },
          southwest: {
            lat: number;
            lng: number;
          }
        }
      };
      placeId: string;
      types: string[];
    }[];
    status: string;
  }
  