import React from 'react'
import { MENU_OPT } from '../../utils/utils.js'
import "./Hamburgermenu.css"

// Menu options
const MENU = ['Home', 'New search', 'Information', 'Recommendations', 'About Stockholm', 'About Falun', 'About Åre'];
// Values to use for the callback method to set the actual page. Important: Must match on index with MENU above.
const MOPT = [MENU_OPT.HOME, MENU_OPT.SEARCH, MENU_OPT.INFO, MENU_OPT.RECOMMEND, MENU_OPT.STOCKHOLM, MENU_OPT.FALUN, MENU_OPT.ARE];

/* App.jsx */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick(val) {
    this.setState({ menuOpen: false });
    for (let i = 0; i < MENU.length; i++) {
      if (MENU[i] === val) {
        this.props.setActiveMainPage(MOPT[i]);
        break;
      }
    }
  }

  render() {
    const styles =
    {
      container: {
        position: 'relative',
        //top: 0,
        //left: 0,
        top: '2vh',
        left: '0.5vh',
        zIndex: '99',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        // background: 'black',
        width: '100%',
        color: 'white',
        fontFamily: 'Lobster',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        filter: this.state.menuOpen ? 'blur(2px)' : null,
        transition: 'filter 0.5s ease',
      },
    }
    const menuItems = MENU.map((val, index) => {
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          onClick={() => { this.handleLinkClick(val); }}>{val}</MenuItem>)
    });

    return (
      <div>
        <div style={styles.container} className="ipad-screen">
          <MenuButton className="ipad-screen" open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

/* MenuItem.jsx*/
class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  handleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const styles = {
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay: this.props.delay,
      },
      menuItem: {
        fontFamily: `'Open Sans', sans-serif`,
        fontSize: '1.2rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
       // color: this.state.hover ? 'gray' : '#fafafa',
       color: this.state.hover ? '#ffcc00' : '#fafafa',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay: this.props.delay,

      },
      line: {
        width: '90%',
        height: '1px',
        background: 'azure',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay: this.props.delay,

      }
    }
    return (
      <div style={styles.container}>
        <div
          style={styles.menuItem}
          onMouseEnter={() => { this.handleHover(); }}
          onMouseLeave={() => { this.handleHover(); }}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
        <div style={styles.line} />
      </div>
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.state.open ? '100%' : 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        //background: 'black',
        background: '#006699',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return (
      <div style={styles.container}>
        {
          this.state.open ?
            <div style={styles.menuList}>
              {this.props.children}
            </div> : null
        }
      </div>
    )
  }
}

/* MenuButton.jsx */
class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
      //color: this.props.color ? this.props.color : 'black',
      color: this.props.color ? this.props.color : '#006699',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const styles = {
      container: {
        height: '32px',
        width: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
      },
      line: {
        height: '2px',
        width: '20px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)' : 'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0 : 1,
        transform: this.state.open ? 'translateX(-16px)' : 'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)' : 'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },
    }
    return (
      <div style={styles.container}
        onClick={this.props.onClick ? this.props.onClick :
          () => { this.handleClick(); }}>
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </div>
    )
  }
}

class Hamburgermenu extends React.Component {
  render() {
    const styles = {
      main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }
    }

    return (
      <div style={styles.main}>
        <App setActiveMainPage={this.props.setActiveMainPage} />
      </div>
    )
  }
}

export default Hamburgermenu;