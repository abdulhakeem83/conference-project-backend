import axios from "axios";

//function to fetch the geolocation from the ip address of the user
export const geoLocation = async (ipAddress: string) => {
  try {
    const response = await axios.get(
      `http://api.ipstack.com/${ipAddress}?access_key=b8aef19ca2dc07323704b349a20cbcdc&format=1`,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err) {
    throw {
      message: "Unable to fetch the location. Please try again !!",
      status: 500,
    };
  }
};
