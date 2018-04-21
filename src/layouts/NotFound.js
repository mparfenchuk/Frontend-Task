import React, { Component } from 'react'
import {
  Container,
  Message,
  Segment
} from 'semantic-ui-react'
 
class NotFound extends Component {

    render() {
        return(
            <div className='main-container'>
                <Segment vertical>
                    <Container text>
                        <Message error content='This page is not found.'/>
                    </Container>
                </Segment>
            </div>
        )
    }
}

export default NotFound
