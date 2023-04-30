/* /pages/index.js */
import React, { useState } from "react";
import { ApolloProvider } from '@apollo/client';
import apolloClient from "../lib/apollo";

import { Col, Input, InputGroup, Button, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";

function Home() {
  const [query, updateQuery] = useState("");
  return (
    <ApolloProvider client={apolloClient}>
      <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <Button> Search </Button>
                <Input
                  onChange={(e) =>
                    updateQuery(e.target.value.toLocaleLowerCase())
                  }
                  value={query}
                  />
              </InputGroup>
            </div>
            <RestaurantList search={query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
            `}
        </style>
      </div>
    </ApolloProvider>
  );
}
export default Home;
