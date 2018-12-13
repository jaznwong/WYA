import React from 'react'
import {Card, CardBody, CardImg, CardTitle} from 'reactstrap'

const UserCard = function({ name }) {
  return (
    <Card className="text-center bg-transparent border-0">
      <CardImg className="rounded-circle"
        top
        src={`https://s3.amazonaws.com/wya-cnds/imgs/avatars/avatar-${Math.floor(Math.random()*9)}.png`}
      />
      <CardBody>
        <CardTitle>{name}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default UserCard