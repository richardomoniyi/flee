import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { HiCheckCircle, HiTruck, HiShoppingBag, HiXCircle } from "react-icons/hi2";


const statusIcons: Record<string, any> = {
  OrderPlaced: <HiShoppingBag color="blue" size={24} />, 
  Dispatched: <HiTruck color="orange" size={24} />, 
  Delivered: <HiCheckCircle color="green" size={24} />, 
  Failed: <HiXCircle color="red" size={24} />,
};

const apiUrl = import.meta.env.VITE_API_URL;
const TrackingPage = () => {
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any[]>([])

  const handleTrack = async () => {
    setLoading(true);
    try {
      // Fetch tracking data from API (Mock API call)
      const response = await fetch(`${apiUrl}/orders/track/${trackingNo}`);
      const data = await response.json();
      setTrackingData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tracking data", error);
      setTrackingData([]);
    } finally {
      setLoading(false);
    }
  };
// Function to format input as 000-000-000-000
const formatTrackingNumber = (input: string) => {
  // Remove all non-numeric characters
  let digits = input.replace(/\D/g, "");
  
  // Limit to 12 digits
  digits = digits.slice(0, 12);

  // Format as 000-000-000-000
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,3})/, (_, p1, p2, p3, p4) => {
    return [p1, p2, p3, p4].filter(Boolean).join("-");
  });
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTrackingNo(formatTrackingNumber(e.target.value));
};
  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Track Your Order
          </Typography>
          <TextField
            fullWidth
            label="Enter Tracking Number"
            variant="outlined"
            value={trackingNo}
            //onChange={(e) => setTrackingNo(e.target.value)}
            onChange={handleChange}
            placeholder="000-000-000-000"
            inputProps={{ maxLength: 15 }} // Includes 3 dashes
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleTrack} disabled={!trackingNo || loading}>
            {loading ? <CircularProgress size={24} /> : "Track"}
          </Button>
        </CardContent>
      </Card>

      {trackingData && (
        <Card style={{ marginTop: "2rem" }}>
          <CardContent>
            <Typography variant="h6">Tracking Details</Typography>
            <VerticalTimeline>
              {trackingData.map((event, index) => (
                <VerticalTimelineElement
                  key={index}
                  date={new Date(event.dispatchDate).toLocaleDateString()}
                  icon={statusIcons[event.eventName] || <HiCheckCircle size={24} />}
                  iconStyle={{ background: "#2196F3", color: "#fff" }}
                >
                  <Typography variant="body1">{event.eventName}</Typography>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TrackingPage;
