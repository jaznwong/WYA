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
  vote,
  name,
  image_url,
  cateogry,
  price,
  location,
  rating,
  url
}) {
  return (
    <Card className="shadow">
      <div className="mx-2 my-2">
        <CardImg top width="100%" src={image_url} alt="Card image cap" />
      </div>
      <CardBody className="text-center">
        <CardTitle className="pb-2">{name}</CardTitle>
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
      </CardBody>
      <CardFooter>
        <div className="row">
          <Button
            className="btn btn-primary col ml-3 mr-2"
            color="success"
            onClick={() => {
              vote(true);
            }}
          >
            Yes!{" "}
          </Button>
          <a
            className="btn btn-primary col ml-2 mr-2 text-light"
            target="_blank"
            color="info"
            href={url}
          >
            More Info{" "}
          </a>
          <Button
            className="btn btn-primary col mr-3 ml-2"
            color="danger"
            onClick={() => {
              vote(false);
            }}
          >
            No
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventInfo;
