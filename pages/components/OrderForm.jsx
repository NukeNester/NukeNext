import React, { useEffect, useState } from "react"; // Import useState and useEffect from react
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const OrderForm = ({ organizationName, handlePopupClose }) => {
  const [orderData, setOrderData] = useState({
    organizationName: organizationName,
    dateOrdered: new Date(),
    wasteType: "",
    quantity: "",
    timeToDecay: "",
    latitude: 0,
    longitude: 0,
  });
  //const [marker, setMarker] = useState(null);
  let marker = null;

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 10,
    });

    newMap.on("load", async () => {
      newMap.addControl(new mapboxgl.NavigationControl());

      // Add event listener for map click
      newMap.on("click", (e) => {
        const lngLat = e.lngLat;

        // Remove existing marker if it exists
        if (marker) {
          marker.remove();
        }

        // Create a new marker at the clicked location
        marker = new mapboxgl.Marker()
          .setLngLat([lngLat.lng, lngLat.lat])
          .addTo(newMap);


        // Update order data with the clicked location
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          longitude: lngLat.lng,
          latitude: lngLat.lat,
        }));
      });
    });
  }, []); // Empty dependency array to run once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(orderData);
      const response = await axios.post(
        `https://server-iwh0.onrender.com/orders/createOrder`,
        orderData
      );
      console.log("Order created successfully:", response.data);
      wasteType("");
      quantity("");
      timeToDecay("");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#161716",
      }}
      className="max-w-7xl relative inline-block align-bottom w-5/6 py-10 bg-gray-900 border border-gray-700 rounded-lg px-20 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle "
    >
      <div>
        <div className="mt-3 sm:mt-5">
          <h1 className="text-white text-5xl text-center pb-10">
            Place An Order
          </h1>
          <div className="flex justify-center items-center gap-x-20">

            {/* INPUT BOX */}
            <div className="text-white text-lg pb-2 px-10">
              {/* Prompt 1 */}
              <div className="flex items-start flex-col mb-10">
                <label className=" text-white pb-1 ">Type of Waste:</label>
                <select onChange={handleInputChange} id="wasteType" name="wasteType" className="border border-neutral-700 px-16 rounded-md text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90" >
                  <option value="Uranium">Uranium</option>
                  <option value="Plutonium">Plutonium</option>
                  <option value="Thorium">Thorium</option>
                  <option value="Americium">Americium</option>
                </select>
              </div>




              {/* Prompt 2 */}
              <div className="flex items-start flex-col mb-10">
                <label className=" text-white pb-1">Quantity of Waste {"(lbs)"}:</label>
                <input
                  type="number"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleInputChange}
                  className={styles.inputBoxStyle}
                />
              </div>



              {/* Prompt 3 */}
              <div className="flex items-start flex-col mb-10">
                <label className=" text-white pb-1">Time to Decay:</label>
                <input
                  type="date"
                  name="timeToDecay"
                  value={orderData.timeToDecay}
                  onChange={handleInputChange}
                  className="border border-neutral-700 px-11 rounded-md text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90"
                />
              </div>

            </div>

            {/* Map Display */}
            <div className="" id="map" style={{ height: "400px", width: "50%" }} />


          </div>


          <div className="pt-20 ">
            <div className="flex items-center justify-center">
              <button
                className={styles.buttonBrownStyle}
                onClick={handlePopupClose}
              >
                Close
              </button>
              <button
                className={styles.buttonGreenStyle}
                onClick={handleSubmit} // Call the handleSubmit function on button click
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  buttonBrownStyle:
    "border border-neutral-700 mx-3 rounded-md w-20 text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90",
  buttonGreenStyle:
    "border border-neutral-700 mx-3 rounded-md px-4 text-white py-2 bg-green-700 hover:text-neutral-300 hover:bg-green-800",
  inputBoxStyle:
    "border border-neutral-700 px-6 rounded-md text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90",
};

export default OrderForm;
