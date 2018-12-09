import React, { Component } from "react";
import { connect } from "react-redux";
import { createRoom } from "../../store/actions/room";
import { Row, Col, Form, Input, FormGroup, Label, Jumbotron, Button, Alert} from "reactstrap";

class Room extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: "",
      name: "",
      description: "",
      modal: false
    };
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .createRoom(this.state.name, this.state.description)
      .then((res)=>{
        console.log(res.data.id)
        this.props.history.push(`/room/view/${res.data.id}`)
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(this.state.name);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Row className="mt-5">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center shadow pt-4 bg-dark">
          <Jumbotron style={{backgroundColor: "#ADD8E6"}} >
            <h1 className="display-4">Create a Room</h1>
          </Jumbotron>
          <Jumbotron style={{backgroundColor: "#ADD8E6"}}>
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label> Room Name </Label>
                <Input className="px-3" name="name" onChange={this.handleChange} value={this.state.name} required/>
              </FormGroup>
              <FormGroup>
                <Label> Room Description </Label>
                <Input className="px-3" name="description" onChange={this.handleChange} value={this.state.description} required/>
              </FormGroup>
              <Button>Create!</Button>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  { createRoom }
)(Room);
