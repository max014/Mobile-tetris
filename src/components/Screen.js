import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Display from './Display';
import Score from './Score';
import Level from './Level';
import Pause from './Pause';
import Menu from './Menu';
import Lost from './Lost';
import {connect} from 'react-redux';

const Screen = props => {
  let content = null;
  switch(props.page){
    case "menu":
      content = <Menu/>;
      break;
    case "lost":
      content = <Lost/>;
      break;
    case "game":
      content = (
        <React.Fragment>
          <View style={styles.side}>
            <Level/>
          </View>
          <Display refreshRate={1000/30}/>
          <View style={styles.side}>
            <Score/>
          </View>
          <Pause/>
        </React.Fragment>
      );
      break;
    default:
      return;
  };

  return (
    <View style={styles.screen}>
      {content}
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#eee',
    height: 300,
    width: 330,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden"
  },
  side: {
    width: '27%'
  }
});

const mapStateToProps = state => {
  return {
    menu: state.game.menu,
    page: state.game.page
  }
}


export default connect(mapStateToProps)(Screen);