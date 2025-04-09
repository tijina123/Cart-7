import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Dropdown } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AdminService from "../../services/admin-api-service/AdminService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const Dashboard = () => {
   const { getWeeklyOrder,getsalesByCategory, getProductData, getUserData, getOrder} = AdminService()
     const [products, setProducts] = useState([]);
       const [users, setUsers] = useState([]);
         const [orders, setOrders] = useState([])
         
  // const weeklySalesData = {
  //   labels: ["2023-03-28", "2023-03-05", "2023-03-08"],
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: [1200, 200, 1000],
  //       borderColor: "#28a745",
  //       fill: false,
  //     },
  //   ],
  // };

  const [weeklySalesData, setWeeklySalesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        borderColor: "#28a745",
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchWeeklyOrders = async () => {
      try {
        const response = await getWeeklyOrder();
        setWeeklySalesData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Orders",
              data: response.data.data,
              borderColor: "#28a745",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching weekly orders:", error);
      }
    };

    fetchWeeklyOrders();
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  

  const fetchProducts= async()=> {
    try {
      const response = await getProductData();
    
      setProducts(response.products);
      
      

      
    } catch (error) {
      
    }

  }



  const fetchUsers= async()=> {
    try {
      const response = await getUserData();
 
      setUsers(response.users);
      

      
    } catch (error) {
      
    }

  }


  const fetchOrders = async()=> {
    try {
      const response = await getOrder();
    
      setOrders(response.orders);
      

      
    } catch (error) {
      
    }

  }


  // const pieData = {
  //   labels: ["Mint", "Yellow Sweet Corn"],
  //   datasets: [
  //     {
  //       data: [30, 20],
  //       backgroundColor: ["#28a745", "#ffc107"],
  //     },
  //   ],
  // };

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#28a745", "#ffc107", "#007bff", "#dc3545", "#17a2b8"], // Colors for categories
      },
    ],
  });

  useEffect(() => {
    const fetchSalesByCategory = async () => {
      try {
        const response = await getsalesByCategory();
        setPieData({
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.data,
              backgroundColor: ["#28a745", "#ffc107", "#007bff", "#dc3545", "#17a2b8"], // Extend colors as needed
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales by category:", error);
      }
    };

    fetchSalesByCategory();
  }, []);

  return (
    <Container fluid>
      <Row className="mt-3">
        {["Total Users", "Total Orders", "Total Product"].map((title, index) => (
          <Col md={2} key={index}>
            <Card className="text-center p-3 shadow-sm">
              <h6>{title}</h6>
              <h5>$ {Math.floor(Math.random() * 50000)}</h5>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card className="p-3">
            <h6>Weekly Sales</h6>
            <Line data={weeklySalesData} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h6>Best Selling Products</h6>
            <Pie data={pieData} />
          </Card>
        </Col>
      </Row>
      {/* <Row className="mt-3">
        <Col>
          <Card className="p-3">
            <h6>Recent Orders</h6>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Order Time</th>
                  <th>Customer Name</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {["Delivered", "Pending", "Delivered"].map((status, index) => (
                  <tr key={index}>
                    <td>118{index + 1}</td>
                    <td>7 Mar, 2025 12:34 AM</td>
                    <td>{index === 0 ? "Miraj Islam" : index === 1 ? "Farid Gouaa" : "aa"}</td>
                    <td>Cash</td>
                    <td>$ {Math.floor(Math.random() * 1000)}</td>
                    <td>{status}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="secondary" size="sm">
                          {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Delivered</Dropdown.Item>
                          <Dropdown.Item>Pending</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;
