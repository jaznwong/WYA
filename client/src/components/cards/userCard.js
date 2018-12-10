import React from 'react'
import {Card, CardBody, CardImg, CardTitle} from 'reactstrap'

const UserCard = function({ name }) {
  return (
    <Card className="text-center bg-transparent border-0">
      <CardImg className="rounded-circle"
        top
        src="http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-War-Machine-icon.png"
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default UserCard