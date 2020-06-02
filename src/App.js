import React, { useState } from "react";
import "./App.css";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [value, setValue, show] = useState({
    total: "0",
    coin: "btc",
    show: false,
    cryptoTotal: 0
  });

  const coins = [
    {
      symbol: "btc",
    },
  ];

  let total = value.total;
  let coin = value.coin;

  let fiatTotal = 0.0;
  let cryptoTotal = value.cryptoTotal;

  const getRate = (coin, fiat) => {
    return 15000.0;
  } 

  const handlePress = (e) => {
    console.log(e);

    if (e === "clear") {
      setValue({ total: "0" });
    } else {

      fiatTotal = fiatTotal * 10;
      fiatTotal += Number(e);

      if (value.total === "0") {
        setValue({ total: e });
      } else {
        setValue({ total: total + e });
      }
    }

    //setValue({ cryptoTotal: getRate(fiatTotal, "AUD")});
  };

  const handleSubmit = (e) => {
    //Authorization: Basic MFVPUVY3TWlMUFFwWWlIRUkwN1Y3UlFVbEVSeTdWTWluVVcwa0RVSWRJTA==
    const basicAuth = process.env.REACT_APP_AUTH;
    const storeID = process.env.REACT_APP_STORE_ID;
    const price = Number(value.total);

    const invoice = {
      price: 1, //price
      currency: "AUD",
      orderId: "1234",
      itemDesc: "POS",
    };

    const formData = new FormData();
    formData.set("storeId", storeID);
    formData.set("price", price);
    formData.set("currency", "AUD");

    axios({
      method: "POST",
      url: "https://payments.bitcoinbrisbane.com.au/api/v1/invoices",
      data: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   'Authorization Basic': + basicAuth
      // }
    })
      .then(function (response) {
        //handle success
        console.log(response);
        const invoiceId = response.data.id;
        setValue({ invoiceId: invoiceId, show: true });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setValue({ show: true });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BTC Pay Terminal</h1>

        <h2>
          Total: ${total} / {cryptoTotal} {coin}{" "}
        </h2>

        <Container fluid>
          <Row>
            {coins.map((coin) => (
              <Col key={coin.symbol}>
                <Button onClick={(e) => handlePress("2")} variant="info" block>
                  {coin.symbol}
                </Button>
              </Col>
            ))}
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button onClick={(e) => handlePress("7")} variant="primary" block>
                7
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("8")} variant="primary" block>
                8
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("9")} variant="primary" block>
                9
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button onClick={(e) => handlePress("4")} variant="primary" block>
                4
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("5")} variant="primary" block>
                5
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("6")} variant="primary" block>
                6
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button onClick={(e) => handlePress("1")} variant="primary" block>
                1
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("2")} variant="primary" block>
                2
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress("3")} variant="primary" block>
                3
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button onClick={(e) => handlePress("0")} variant="primary" block>
                0
              </Button>
            </Col>
            <Col>
              <Button onClick={(e) => handlePress(".")} variant="primary" block>
                .
              </Button>
            </Col>
            <Col>
              <Button
                onClick={(e) => handlePress("clear")}
                variant="primary"
                block
              >
                CLEAR
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col>
              <Button
                onClick={(e) => handleSubmit("buy")}
                variant="success"
                block
              >
                BUY
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </header>

      {/* <Modal show={show}>
        <Modal.Header>
            <Modal.Title>Pay</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal> */}

      {/* <form method="POST" action="https://payments.bitcoinbrisbane.com.au/api/v1/invoices" className="btcpay-form btcpay-form--block">
        <input type="hidden" name="storeId" value="J6kKcRQmyREYhBvhid9NvrgcqQksxZTTHtUANkKTRLqb" />
        <input type="hidden" name="checkoutDesc" value="Order" />
        <input type="hidden" name="price" value="10" />
        <input type="hidden" name="currency" value="AUD" />
        <input type="image" className="submit" name="submit" src="https://payments.bitcoinbrisbane.com.au/img/paybutton/pay.svg" alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"/>
      </form> */}
    </div>
  );
}

export default App;
