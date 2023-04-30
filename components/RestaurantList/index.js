/* components/RestaurantList/index.js */
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import Link from "next/link";
import apolloClient from "../../lib/apollo";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    restaurants {
      id
      Name
      Description
      Image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading restaurants";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.restaurants && data.restaurants.length) {
    //searchQuery
    const searchQuery = data.restaurants.filter((query) =>
      query.Name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <ApolloProvider client={apolloClient}>
          <Row>
            {searchQuery.map((res) => (
              <Col xs="6" sm="4" key={res.id}>
                <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                  <CardImg
                    top={true}
                    style={{ height: 250 }}
                    src={
                      process.env.NODE_ENV === "production"
                        ? res.Image.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${res.Image.url}`
                    }
                  />
                  <CardBody>
                    <CardTitle>{res.Name}</CardTitle>
                    <CardText>{res.Description}</CardText>
                  </CardBody>
                  <div className="card-footer">
                    <Link
                      className="btn btn-primary"
                      as={`/restaurants?${res.id}`}
                      href={`/restaurants?id=${res.id}`}
                    >
                      View
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}

            <style jsx global>
              {`
                a {
                  color: white;
                }
                a:link {
                  text-decoration: none;
                  color: white;
                }
                a:hover {
                  color: white;
                }
                .card-columns {
                  column-count: 3;
                }
              `}
            </style>
          </Row>
        </ApolloProvider>

      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
