import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: 180,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20
  };

  return (
    <div>
      <div style={boxStyle} className="display-flex">
        <span><small style={{ fontSize: '0.6rem' }}>Min: </small>{data.min}</span>
        <span className="fill"></span>
        <span><small style={{ fontSize: '0.6rem' }}>Max: </small>{data.max}</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
      <small style={{ fontSize: '0.6rem' }}>Vote share per state</small>
      <div style={{padding:'10px'}}>
        <h4>Total Votes: {data.total}</h4>
      </div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

export default LinearGradient;
