import React, { Component } from 'react';
import { Link } from 'react-router'
import {
  Container,
  Grid,
  Card,
  Image
} from 'semantic-ui-react'

class Main extends Component {

  render() {
    
    return (
        <div>
            <div className='main-container'>
                <Container text>
                    <Grid centered>
                        <Grid.Row columns='equal'>
                            <Grid.Column>
                                <Card as={Link} to={'/frontend-task/charts'} fluid>
                                    <Image src='/frontend-task/assets/images/charts.jpg' />
                                    <Card.Content>
                                    <Card.Header>
                                        Charts
                                    </Card.Header>
                                    <Card.Description>
                                        A single page application that displays charts to simulate an activity in real-time using the activity-data.json file.
                                    </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card as={Link} to={'/frontend-task/wallet'} fluid>
                                    <Image src='/frontend-task/assets/images/wallet.jpg' />
                                    <Card.Content>
                                    <Card.Header>
                                        Wallet
                                    </Card.Header>
                                    <Card.Description>
                                        A simple wallet of token, where user can send token to an address, and receive it.
                                    </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        </div>
    );
  }
}

export default Main;
