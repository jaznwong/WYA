import React, { Component } from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Button} from 'reactstrap'

const UserCard = function({ name }) {
  return (
    <div className="card text-center">
      <img
        className="card-img-top"
        src="http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-War-Machine-icon.png"
        alt="User Avatar"
      />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
      </div>
    </div>
  );
};

const UserList = function({ userlist }) {
  let users = userlist.map(user => {
    // console.log(user.username)
    return <UserCard name={user.username} />;
  });

  return <div className="card-deck">{users}</div>;
};

const EventInfo = function({name, image_url, cateogry, price, location, description}) {
  let displayPrice = ""
  for(let i = 0 ; i < price ; i++){
    displayPrice += "$"
  }
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src={image_url}
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>
          Cateogry: {cateogry}
        </CardText>
        {/* Price: {displayPrice}
          Location: {location} */}
          <CardText>
            Price: {displayPrice}
          </CardText>
          <CardText>
            Location: {location}
          </CardText>
        <CardText>
          <div className="row">
            <Button className="btn btn-primary col mx-5" color="success">Yes! </Button>
            <Button className="btn btn-primary col mx-5" color="danger">No</Button>
          </div>
        </CardText>
        <CardText>
          {description}
        </CardText>
      </CardBody>
    </Card>
  );
};

class RoomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Lorem Ipsum",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical"
    };
  }
  render() {
    let userlist = [{ username: "user1" }, { username: "User2" }];

    return (
      <div>
        <div className="jumbotron" style={{ height: "25%" }}>
          <h1 className="display-4">{this.state.name}</h1>
          <p>{this.state.description}</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col mx-3">
              <UserList userlist={userlist} />
            </div>
            <div className="col mx-3">
              {/* name, image_url, cateogry, price, location */}
              <EventInfo 
                name={"Tasty Hand-Pulled Noodles"} 
                image_url={"https://s3-media3.fl.yelpcdn.com/bphoto/on5kwb77QO9cS78kxllnOA/o.jpg"}
                cateogry="American"
                price={4}
                location="1 Doyers St New York, NY 10013"
                description={this.state.description}
              />
              <div className="row">
                {/* <Vote /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomPage;
