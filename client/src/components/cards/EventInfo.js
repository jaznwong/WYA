import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  Button
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

const EventInfo = function({
  name,
  image_url,
  cateogry,
  price,
  location,
  description
}) {
  let displayPrice = "";
  for (let i = 0; i < price; i++) {
    displayPrice += "$";
  }
  return (
    <Card>
      <div className="mx-2 my-2">
        <CardImg top width="100%" src={image_url} alt="Card image cap" />
      </div>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <PerfectScrollbar>
          <div className="position-static" style={{ height: "150px" }}>
            <CardText>
              {" "}
              <span className="font-weight-bold">Category: </span> {cateogry}
              <CardText>
                <span className="font-weight-bold">Price: </span> {displayPrice}
              </CardText>
              <CardText>
                <span className="font-weight-bold"> Location: </span> {location}
              </CardText>
              <p className="my-2">{description}</p>
            </CardText>
          </div>
        </PerfectScrollbar>
        <CardFooter>
          <div className="row">
            <Button className="btn btn-primary col ml-3 mr-5" color="success">
              Yes!{" "}
            </Button>
            <Button className="btn btn-primary col mr-3 ml-5" color="danger">
              No
            </Button>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default EventInfo;
