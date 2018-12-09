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
  rating
}) {
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
            </CardText>
            <CardText>
              <span className="font-weight-bold">Price: </span> {price}
            </CardText>
            <CardText>
              <span className="font-weight-bold"> Location: </span> {location}
            </CardText>
            <CardText>
              <span className="font-weight-bold"> Rating: </span> {rating}
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
