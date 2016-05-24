import React, {Component, PropTypes} from 'react'
import { Modal, Button, Glyphicon, Input, Row, Col } from 'react-bootstrap'

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

export default class ActionModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  close () {
    this.setState({
      showModal: false
    })
  }

  open () {
    this.setState({
      showModal: true
    })
  }

  ok () {
    this.close()
  }

  render () {

    let selectedIds = this.props.projects.all.filter(p => (p.selected && p.id !== 'freq')).map(p => p.id)

    const freqProj = this.props.projects.all.find(p => p.id === 'freq')
    if (freqProj && freqProj.percentage > 0) selectedIds.push('freq'+freqProj.percentage)
    let shareUrl = window.location.href.split('?')[0]
    if(selectedIds.length > 0) shareUrl += '?projects=' + selectedIds.join(',')
    const shareTitle = "My Vision for MARTA Expansion in Atlanta"

    const subHeadingStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '2px',
      marginTop: '16px'
    }

    const shareLabelStyle = {
      fontSize: '18px',
      marginLeft: '8px'
    }

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          <Modal.Title style={{ fontSize: '24px' }}><i className='fa fa-bullhorn'></i>&nbsp;&nbsp;Share & Take Action</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Once you've crafted your own vision for MARTA expansion in Atlanta, it's time to make your voice heard.</h4>

          <div style={subHeadingStyle}><i className='fa fa-check-square-o'></i>&nbsp;&nbsp;Share Your Personal Project List</div>
          <p>Use the following links to share your list via Facebook, Twitter, or as shareable URL.</p>
          <Row style={{ marginTop: '16px' }}>
            <Col xs={6}>
              <FacebookShareButton
                url={shareUrl}
                title={shareTitle}
                style={{ float:'left', marginTop: '-3px', cursor: 'pointer' }}
              >
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
              <span style={shareLabelStyle}>Share on Facebook</span>
            </Col>

            <Col xs={6}>
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                style={{ float:'left', marginTop: '-3px', cursor: 'pointer' }}
              >
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
              <span style={shareLabelStyle}>Share on Twitter</span>
            </Col>
          </Row>

          <div style={{ marginTop: '12px' }}>
            Link to your project list:
            <Input type='text' value={shareUrl} />
          </div>


          <div style={subHeadingStyle}><i className='fa fa-check-square-o'></i>&nbsp;&nbsp;Attend a Public Meeting</div>
          <p>Meetings to gather public feedback on the MARTA expansion opportunity
          are being held between May 25 and June 2. <a href="http://www.atlantaga.gov//index.aspx?page=672&recordid=4461&utm_source=dlvr.it&utm_medium=twitter" target="_blank">Click here for details.</a></p>

          <div style={subHeadingStyle}><i className='fa fa-check-square-o'></i>&nbsp;&nbsp;Contact Your Elected Officials</div>
          <p>Email Links to your City Council Members (don&#39;t forget to contact
          the three at large members (Posts 1-3), your district member, and the Council
          President):&nbsp;
          <a href="mailto:csmith@atlantaga.gov" target="_blank">Carla Smith</a> (District 1),&nbsp;
          <a href="mailto:khall@atlantaga.gov" target="_blank">Kwanza Hall</a> (District 2),&nbsp;
          <a href="mailto:ilyoung@atlantaga.gov" target="_blank">Ivory Lee Young</a> (District 3),&nbsp;
          <a href="mailto:cwinslow@atlantaga.gov" target="_blank">Cleta Winslow</a> (District 4),&nbsp;
          <a href="mailto:narchibong@atlantaga.gov" target="_blank">Natalyn M. Archibong</a> (District 5),&nbsp;
          <a href="mailto:awan@atlantaga.gov" target="_blank">Alex Wan</a> (District 6),&nbsp;
          <a href="mailto:hshook@atlantaga.gov" target="_blank">Howard Shook</a> (District 7),&nbsp;
          <a href="mailto:yadrean@atlantaga.gov" target="_blank">Yolanda Adrean</a> (District 8),&nbsp;
          <a href="mailto:fmoore@atlantaga.gov" target="_blank">Felicia Moore</a> (District 9),&nbsp;
          <a href="mailto:cmartin@atlantaga.gov" target="_blank">C.T. Martin</a> (District 10),&nbsp;
          <a href="mailto:kbottoms@atlantaga.gov" target="_blank">Keisha Bottoms</a> (District 11),&nbsp;
          <a href="mailto:jmsheperd@atlantaga.gov" target="_blank">Joyce Sheperd</a> (District 12),&nbsp;
          <a href="mailto:mbond@atlantaga.gov" target="_blank">Michael Julian Bond</a> (Post 1 at large),&nbsp;
          <a href="mailto:mnorwood@atlantaga.gov" target="_blank">Mary Norwood</a> (Post 2 at large),&nbsp;
          <a href="mailto:adickens@atlantaga.gov" target="_blank">Andre Dickens</a> (Post 3 at large), and&nbsp;
          <a href="mailto:ccmitchell@atlantaga.gov" target="_blank">Ceasar C. Mitchell</a> (Council President)</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.ok()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
