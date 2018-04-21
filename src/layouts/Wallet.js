import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setWeb3, deleteWeb3 } from '../utils/getWeb3'
import { between, isAddress } from '../utils/checkInput'
import { initData } from '../actions/InitializeWallet'
import { sendToken } from '../actions/transactions/sendToken'
import { sendEther } from '../actions/transactions/sendEther'
import { clearTransaction } from '../actions/transactions/clear'
import {
  Container,
  Menu,
  Button,
  Card,
  Form,
  Checkbox,
  Grid,
  Header,
  Message,
  Dimmer,
  Loader,
  Modal
} from 'semantic-ui-react'
 
class Wallet extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            checkboxValue: 'token',
            inputAddress: '',
            inputFee: '',
            inputGas: '',
            inputConvertValue: '',
            convertResultValue: '0',
            errorMessage: false,
            errorMessageText: '',
            loading: false,
            isResult: false
        }

        this.initData = true;
    }

    componentWillMount(){

        let { dispatch } = this.props
        dispatch(setWeb3());
    }
    
    componentWillUnmount(){

        let { web3, dispatch } = this.props
        dispatch(deleteWeb3(web3.engine))
    }

    componentWillReceiveProps(nextProps){

        let { dispatch, address } = this.props
        let { web3, transactionFailed } = nextProps
  
        if(web3.isLoaded && this.initData){

            this.initData = false;
            dispatch(initData(address, web3.web3Instance))
        }

        if(transactionFailed != null){

            this.setState({ loading:false, isResult:true })
        }
    }

    checkboxChange = (e, { value }) => this.setState({ checkboxValue:value })

    inputAddresChange = (e, { value }) => this.setState({ inputAddress:value })

    inputFeeChange = (e, { value }) => this.setState({ inputFee:value })

    inputGasChange = (e, { value }) => this.setState({ inputGas:value })

    inputConverValueChange = (e, { value }) => this.setState({ inputConvertValue:value, convertResultValue: value*1000 })

    formSubmit = (e) => {

        let { inputFee, inputAddress, inputGas, checkboxValue } = this.state

        let { web3, dispatch, seed } = this.props
		
        if(checkboxValue === 'ether'){

            if (!between(inputFee, 0.001, 1000)){
                return this.setState({ errorMessage: true, errorMessageText: 'Minimum ether amount should be between 0.001 and 1000.' })
            }

            if (!isAddress(inputAddress.toLowerCase(), web3.web3Instance)){
                return this.setState({ errorMessage: true, errorMessageText: 'Enter valid address.' })
            }

            if (!between(inputGas, 1000, 6000000)){
                return this.setState({ errorMessage: true, errorMessageText: 'Gas amount should be between 1000 and 6000000.' })
            }

            dispatch(sendEther(seed, inputAddress, inputFee, inputGas, web3.web3Instance))
        }
        
        if(checkboxValue === 'token'){

            if (!between(inputFee, 1, 1000)){
                return this.setState({ errorMessage: true, errorMessageText: 'Minimum token amount should be between 1 and 1000.' })
            }

            if (!isAddress(inputAddress.toLowerCase(), web3.web3Instance)){
                return this.setState({ errorMessage: true, errorMessageText: 'Enter valid address.' })
            }

            dispatch(sendToken(seed, inputAddress, inputFee, web3.web3Instance))
        }
		
        this.setState({ errorMessage: false, errorMessageText: '', loading: true})

    }

    updateData(){

        let { dispatch, address, web3 } = this.props
        
        this.setState({ isResult:false, inputAddress: '', inputFee: '', inputGas: '' })

        dispatch(clearTransaction())
        dispatch(initData(address, web3.web3Instance))
    }

    render() {

        let { web3, blockNumber, ethBalance, tokenBalance, address, seed, transactionResult, transactionFailed } = this.props
        let { checkboxValue, inputFee, inputAddress, inputGas, inputConvertValue, convertResultValue, errorMessage, errorMessageText, loading, isResult } = this.state

        if(!web3.isLoaded){
            return(
                <Dimmer active>
                    <Loader size='huge'/>
                </Dimmer>	
            )
          } else {
            return(
                <div>
                    <Menu fixed='left' vertical className='left-sidebar' style={{ zIndex: '-1', paddingTop: '7em' }}>
                        <Container>
                            <Menu.Item as='h3'>
                                A simple wallet of token, where user can send token to an address, and receive it. (Rinkeby Testnet)
                            </Menu.Item>
                        </Container>
                    </Menu>
                    <div className='other-container'>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as='h2' content='My Wallet'/>            
                                    <Header as='h3' content='Address:'/>
                                    <p>{address}</p>
                                    <Header as='h3' content='Seed:'/>
                                    <p>{seed}</p><br/>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                Transaction
                                            </Card.Header><br/>
                                            <Message error hidden={!errorMessage} content={errorMessageText}/>
                                            <Form onSubmit={this.formSubmit} size='large'>
                                                <Form.Group>
                                                    <Form.Input value={inputFee} onChange={this.inputFeeChange} fluid label={this.state.checkboxValue === 'ether' ? 'ETH amount' : 'Token amount'} placeholder='Enter amount' type="number" step={this.state.checkboxValue === 'ether' ? '0.001' : '1'}  min={this.state.checkboxValue === 'ether' ? '0.001' : '1'} max="1000" width={6} />
                                                    <Form.Input value={inputAddress} onChange={this.inputAddresChange} fluid label='Recipient address' placeholder='Enter recipient address' width={10} />
                                                    <Form.Input disabled={checkboxValue === 'ether' ? false : true} value={inputGas} onChange={this.inputGasChange.bind(this)} fluid label='GAS Amount' placeholder='Enter gas' type="number" step="1000" min="1000" max="6000000" width={6} />
                                                </Form.Group>
                                                <Form.Field>
                                                    <Checkbox radio label='Token' name='checkboxRadioGroup' value='token' checked={checkboxValue === 'token'} onChange={this.checkboxChange} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Checkbox radio label='Ether' name='checkboxRadioGroup' value='ether' checked={checkboxValue === 'ether'} onChange={this.checkboxChange} />
                                                </Form.Field>
                                                <Button.Group size='large'>
                                                    <Button positive type='submit'>Submit</Button>
                                                </Button.Group>
                                            </Form>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                Number of block
                                            </Card.Header><br/>
                                                {blockNumber}
                                        </Card.Content>
                                    </Card> 
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                Balance of Ethers
                                            </Card.Header><br/>
                                                {ethBalance} ETH
                                        </Card.Content>
                                    </Card> 
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                Balance of Tokens
                                            </Card.Header><br/>
                                                {tokenBalance} TKN
                                        </Card.Content>
                                    </Card> 
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                Converter
                                            </Card.Header><br/>
                                            <Form size='large'>
                                                <Form.Input value={inputConvertValue} onChange={this.inputConverValueChange} fluid label='ETH amount' placeholder='Enter amount' type="number" step="0.001" min="0.001" max="1000"/>
                                                <Header content={convertResultValue + ' TKN'}/>
                                            </Form>
                                        </Card.Content>
                                    </Card> 
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <Modal basic open={loading}>
                        <Loader size='huge'/>
                    </Modal>
                    <Modal basic open={isResult} onClose={() => this.updateData()} closeIcon>
                        <Header content='Transaction' />
                        <Modal.Content>
                            {
                                transactionFailed === false 
                                ? 
                                <p>Transaction successfully processed. <a href={'https://rinkeby.etherscan.io/tx/'+transactionResult} target="_blank">Here</a> you can find all information about it.</p>
                                :
                                <p>{transactionResult}</p>
                            }
                        </Modal.Content>
                    </Modal>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        web3: state.web3,
        blockNumber: state.wallet.blockNumber,
        ethBalance: state.wallet.ethBalance,
        tokenBalance: state.wallet.tokenBalance,
        address: state.wallet.address,
        seed: state.wallet.seed,
        transactionFailed: state.transaction.transactionFailed,
        transactionResult: state.transaction.transactionResult
    }
  }
  
  export default connect(mapStateToProps)(Wallet);